TESTS = tests/*.js
HAPROXYPID = `cat haproxy.pid`
CRYPTOPID = `cat crypto.pid`
MESSAGEPID = `cat message.pid`
USERPID = `cat user.pid`

test:
	  ./node_modules/.bin/mocha --timeout 5000 --reporter nyan $(TESTS)
		 
.PHONY: test

serve:
	rm -rf logs
	mkdir logs
	kill $(CRYPTOPID) || true
	kill $(MESSAGEPID) || true
	kill $(USERPID) || true
	{ node cryptoService.js > logs/crypto.log & echo $$! > crypto.pid; } &
	{ node messageService.js > logs/message.log & echo $$! > message.pid; } &
	{ node userService.js > logs/user.log & echo $$! > user.pid; } &
	haproxy -f haproxy.cfg -st $(HAPROXYPID) &
		
.PHONY: serve

setup:
	npm install
