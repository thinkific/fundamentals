ZIP_OUTPUT=fundamentals
INCLUDE_FILES=./src/* ./src/.version

# Zip (.version | manifest.json | *.liquid)
zip: clean
	7z a -tzip -r $(ZIP_OUTPUT) $(INCLUDE_FILES)

clean:
	rm -rf $(ZIP_OUTPUT).zip

.PHONY: zip clean
