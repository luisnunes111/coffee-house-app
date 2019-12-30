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
	Quantity: number;

	@Column("int")
	Type: ProductType;

	@Column("varchar", {length: 255, nullable: true})
	ImageId: string;

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
