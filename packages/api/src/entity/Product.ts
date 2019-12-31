import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity} from "typeorm";
import {v4} from "uuid";

export enum ProductType {
	TEA,
	COFFEE,
}

@Entity()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar", {length: 200})
	name: string;

	@Column("text", {nullable: true})
	description: string;

	@Column("int")
	quantity: number;

	@Column("int")
	type: ProductType;

	@Column("varchar", {length: 255, nullable: true})
	image_name: string;

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
