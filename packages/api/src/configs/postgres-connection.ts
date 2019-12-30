import {createConnection, getConnectionOptions} from "typeorm";

export default async () => {
	let retries = 5;
	while (retries) {
		try {
			if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
				const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
				await createConnection({
					...connectionOptions,
					name: "default",
				});
			} else {
				await createConnection();
			}
			break;
		} catch (error) {
			retries--;
			console.log("retries: ", retries, "Error:", error);
			await Promise.resolve((res: any) => setTimeout(res, 5000));
		}
	}
};
