import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BeforeInsert,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
	OneToMany,
} from "typeorm";
import {v4} from "uuid";
import {Notification} from "./Notification";

export enum ProductType {
	TEA = 0,
	COFFEE = 1,
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

	@OneToMany(
		_ => Notification,
		n => n.product,
	)
	product_notifications: Notification[];

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
