FROM mcr.microsoft.com/azure-functions/node:2.0

SHELL ["/usr/bin/env", "bash", "-xeuo", "pipefail", "-c"]
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true
COPY . /home/site/wwwroot
RUN	true \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates \
                texlive-latex-base \
		wget \
	&& wget https://github.com/jgm/pandoc/releases/download/2.7.2/pandoc-2.7.2-1-amd64.deb \
	&& dpkg -i pandoc-2.7.2-1-amd64.deb \
	&& find /var/lib/apt/lists \
		-mindepth 1 \
		-delete \
	&& pushd /home/site/wwwroot \
		&& npm install
