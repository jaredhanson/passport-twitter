include node_modules/make-node/main.mk

MOCHAFLAGS = --require ./test/bootstrap/node


clean: clean-docs clean-cov
	-rm -r $(REPORTSDIR)

clobber: clean
	-rm -r node_modules


.PHONY: clean clobber
