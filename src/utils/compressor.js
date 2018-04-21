import ImageCompressor from "image-compressor.js";

const MAX_SIZE = 1000000;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1200;

export function compressJPEG(blob, quality = 1) {
	return new Promise((resolve, reject) => {
		if (blob.size > MAX_SIZE) {
			new ImageCompressor(blob, {
				quality: quality,
				convertSize: MAX_SIZE,
				mimeType: 'jpeg',
				maxWidth: MAX_WIDTH,
				maxHeight: MAX_HEIGHT,
				checkOrientation: true,
				success(result) {
					if (result.size > MAX_SIZE && quality.toFixed(1) > 0.1) {
						quality -= 0.1;
						compressJPEG(blob, quality).then( newResult => {
							resolve(newResult);
						});
					} else {
						console.log("compressed1. Old size: " + blob.size + ". New size: " + result.size + ". Quality: " + quality);
						resolve(result);
					}
				},
				error(e) {
					reject(e);
				},
			});
		} else {
			resolve(blob)
		}
	});
}