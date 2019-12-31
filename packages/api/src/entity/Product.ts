import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {v4} from "uuid";

export enum ProductType {
	TEA,
	COFFEE,
}

@Entity()
export class Product extends BaseEntity {
	constructor(props: any) {
		super();
		Object.assign(this, props);
	}

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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
