import requests
import json
import time
import random
import string

amazonUrl = 'http://localhost:3000/amazon/executeSearch'
ebayUrl = 'http://localhost:3000/ebay/executeSearch'


for number in range(0,200):
	quotes = '"'
	number_string = quotes + str(number) + quotes
	print number_string
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	post_fields = json.dumps({"query": number})
	r = requests.post(url = amazonUrl, headers=headers, data = post_fields)
	#print r.text
	time.sleep(30)


word_site = "http://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text/plain"

response = requests.get(word_site)
WORDS = response.content.splitlines()

for number in range(0,35):
	quotes = '"'
	query_string = quotes + random.choice(WORDS) + quotes
	print query_string
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	post_fields = json.dumps({"query": query_string})
	r = requests.post(url = ebayUrl, headers=headers, data = post_fields)
	#print r.text
	time.sleep(1)
