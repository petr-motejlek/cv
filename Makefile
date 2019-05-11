index.html:
	pandoc \
		-f gfm \
		-i index.md \
		-t html5 -s --self-contained \
		-M title="Petr Motejlek, Curriculum Vitae" \
		-o index.html
