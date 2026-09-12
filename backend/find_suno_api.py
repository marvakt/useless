import urllib.request
import re

req = urllib.request.Request('https://suno.com', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    js_files = re.findall(r'src="([^"]+\.js)"', html)
    for js in js_files:
        if js.startswith('/'):
            js = 'https://suno.com' + js
        try:
            req_js = urllib.request.Request(js, headers={'User-Agent': 'Mozilla/5.0'})
            js_content = urllib.request.urlopen(req_js).read().decode('utf-8')
            urls = re.findall(r'https://[a-zA-Z0-9-]+\.suno\.com', js_content)
            urls.extend(re.findall(r'https://[a-zA-Z0-9-]+\.suno\.ai', js_content))
            urls = set(urls)
            if urls:
                print(js, urls)
        except Exception as e:
            pass
except Exception as e:
    print('Main error:', e)
