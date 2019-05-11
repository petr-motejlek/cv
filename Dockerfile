# syntax=docker/dockerfile:1.0-experimental

FROM ubuntu:latest AS build

COPY index.md Makefile /

RUN	apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates \
		make \
		wget \
	&& wget https://github.com/jgm/pandoc/releases/download/2.7.2/pandoc-2.7.2-1-amd64.deb \
	&& dpkg -i pandoc-2.7.2-1-amd64.deb \
	&& make

FROM nginx:alpine
COPY --from=build /index.html /usr/share/nginx/html/index.html
