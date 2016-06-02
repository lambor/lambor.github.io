#!/usr/bin/env python

import time
import re
import os
from os import listdir
from os.path import isfile, join

def getDate():
	return time.strftime("%Y-%m-%d")


def getFileName(file):
	line = "start"
	title = ""
	front_matter = False
	while line != "":
		line = file.readline()
		if front_matter and line.startswith("---"):
			break

		if line.startswith("---"):
			front_matter = True
			line = line[3:]

		match = re.search('(?<=title:\s).*',line)
		if match is None:
			continue
		title = match.group(0)

		if title != "":
			break

	title = title.replace(" ","")

	return getDate() + "-" + title + ".md"


srcpath = "_drafts"
destpath = "_posts"

def publish():

	for oldFilename in [f for f in listdir(srcpath) if isfile(join(srcpath, f))]:

		if not oldFilename.endswith('.md'): 
			continue

		try:
			sourcePath  = srcpath + "/" + oldFilename
			file = open(sourcePath,"r")
			newFileName = getFileName(file)
			destPath    = destpath + "/" + newFileName
			print "src:"+ sourcePath + " dest:"+destPath
			os.rename(sourcePath,destPath)
		except Exception, e:
			raise e

if __name__ == "__main__":
	publish()