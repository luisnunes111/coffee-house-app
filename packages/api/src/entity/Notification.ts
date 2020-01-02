import {
	BaseEntity,
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import {v4} from "uuid";
import {User} from "./User";
import {Product} from "./Product";

export enum NotificationType {
	LOW_STOCK = 0,
	REFILL_DONE = 1,
}

export interface INotificationDescription {
	quantityBefore: number;
	quantityAfter: number;
}

@Entity()
export class Notification extends BaseEntity {
	constructor(props: Partial<Notification>) {
		super();
		Object.assign(this, props);
	}

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("text")
	message: string;

	@Column("simple-json")
	description: INotificationDescription;

	@Column("boolean", {default: false})
	is_read: boolean;

	@Column("int")
	type: NotificationType;

	@ManyToOne(
		_ => User,
		user => user.to_notifications,
		{cascade: true},
	)
	to_user: User;

	@ManyToOne(
		_ => User,
		user => user.from_notifications,
		{cascade: true},
	)
	from_user: User | null;

	@ManyToOne(
		_ => Product,
		product => product.product_notifications,
		{cascade: true},
	)
	product: Product;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	addId() {
		this.id = v4();
	}
}
