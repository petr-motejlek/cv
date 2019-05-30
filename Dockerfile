# syntax=docker/dockerfile:1.0-experimental

FROM ubuntu:latest AS build

COPY index.md /

RUN	true \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates \
		wget \
	&& wget https://github.com/jgm/pandoc/releases/download/2.7.2/pandoc-2.7.2-1-amd64.deb \
	&& dpkg -i pandoc-2.7.2-1-amd64.deb

CMD 	[ \ 
		"pandoc", \
			"-f", "gfm", \
			"-i", "index.md", \
			"-t", "html5", \
			"-s", "--self-contained", \
			"-M", "title='Petr Motejlek, Curriculum Vitae'", \
			"-o", "/dev/stdout" \
	]
