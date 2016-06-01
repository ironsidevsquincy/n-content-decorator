include n.Makefile

coverage-report:
	istanbul cover node_modules/.bin/_mocha --report $(if $(CIRCLECI),lcovonly,lcov) 'tests/**/*.test.js'

unit-test:
	mocha 'tests/**/*.test.js' --inline-diffs

test: verify

ifeq ($(CIRCLE_BRANCH),master)
	make coverage-report && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
else
	make unit-test
endif
