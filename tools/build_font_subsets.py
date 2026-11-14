"""Build complete-coverage variable WOFF2 shards; no new text requires rebuilding."""
from pathlib import Path
from collections import Counter
import json, sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/font-tools'))
from fontTools import subset
from fontTools.ttLib import TTFont

FONT_DIR = ROOT / '网站管理/素材/fonts/noto-sans-sc'
SOURCE = FONT_DIR / 'NotoSansSC-Variable.ttf'
OUT = FONT_DIR / 'woff2'
OUT.mkdir(exist_ok=True)
original = TTFont(SOURCE)
coverage = set(original.getBestCmap())
axes = [(a.axisTag, a.minValue, a.maxValue) for a in original['fvar'].axes]
original.close()
frequency = Counter()
for folder in ['网站管理/文章', '网站管理/作品', 'themes/frame/layout']:
    for file in (ROOT / folder).rglob('*'):
        if file.suffix in {'.md', '.ejs'}:
            frequency.update(map(ord, file.read_text(encoding='utf-8')))
latin = sorted(c for c in coverage if c < 0x3000)
common = [c for c, _ in frequency.most_common() if c in coverage and c >= 0x3000][:1536]
remaining = sorted(coverage - set(latin) - set(common))
groups = [('latin', latin)]
groups += [(f'common-{i//512:02d}', common[i:i+512]) for i in range(0, len(common), 512)]
groups += [(f'extended-{i//1024:02d}', remaining[i:i+1024]) for i in range(0, len(remaining), 1024)]

def ranges(chars):
    result, start, end = [], None, None
    for c in sorted(chars):
        if start is None: start = end = c
        elif c == end + 1: end = c
        else:
            result.append(f'U+{start:X}' if start == end else f'U+{start:X}-{end:X}')
            start = end = c
    if start is not None:
        result.append(f'U+{start:X}' if start == end else f'U+{start:X}-{end:X}')
    return ','.join(result)

css, report, union = [], [], set()
for name, chars in groups:
    if not chars: continue
    font = TTFont(SOURCE)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    worker = subset.Subsetter(options=opts)
    worker.populate(unicodes=chars)
    worker.subset(font)
    font.flavor = 'woff2'
    target = OUT / (name + '.woff2')
    font.save(target)
    font.close()
    check = TTFont(target)
    actual = set(check.getBestCmap())
    assert actual == set(chars), name
    assert [(a.axisTag,a.minValue,a.maxValue) for a in check['fvar'].axes] == axes
    union.update(actual)
    check.close()
    css.append("@font-face{font-family:'Jopolis Sans';font-style:normal;font-weight:100 900;font-display:swap;src:url('./woff2/" + name + ".woff2') format('woff2');unicode-range:" + ranges(chars) + ';}')
    report.append({'file': target.name, 'characters': len(chars), 'bytes': target.stat().st_size})
    print(name, len(chars), target.stat().st_size, flush=True)
assert union == coverage
(FONT_DIR / 'font.css').write_text('\n'.join(css), encoding='utf-8')
summary = {'unicode_characters': len(coverage), 'axes': axes, 'original_bytes': SOURCE.stat().st_size, 'woff2_bytes': sum(x['bytes'] for x in report), 'files': report}
(FONT_DIR / 'subsets.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
print('Verified full Unicode coverage and variable axes:', json.dumps({k:v for k,v in summary.items() if k!='files'}), flush=True)
