export enum ProductType {
	TEA = 0,
	COFFEE = 1,
}

export function getProductType(type: number) {
	switch (type) {
		case ProductType.TEA:
			return "Tea";
		case ProductType.COFFEE:
			return "Coffee";
		default:
			return "";
	}
}
