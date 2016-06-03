#!/usr/bin/env python

import sys
import time
import os

front_matter = "---\ntitle: \ntags: []\nfilename: \n---";

directory = "_drafts"

def getDate():
	return time.strftime("%Y-%m-%d")


def createFile():
	print "create a new post markdown file."

	fileName = directory + "/" + time.ctime() + ".md"

	fileName = fileName.replace(" ","_")
	fileName = fileName.replace(":","-")

	try:
		file = open(fileName,"w");

		file.write(front_matter)

		file.close()

	except Exception, e:
		raise e
	
if __name__ == "__main__":

	if not os.path.exists(directory):
		os.makedirs(directory)

	createFile()