ZIP_OUTPUT=back-to-basics
INCLUDE_FILES=./build/* ./build/.version

# Zip (.version | manifest.json | *.liquid)
zip: clean gulp version
	7z a -tzip -r $(ZIP_OUTPUT) $(INCLUDE_FILES)

gulp:
	gulp

version:
	cp src/.version build/.version

clean:
	rm -rf $(ZIP_OUTPUT).zip

.PHONY: zip version gulp clean
