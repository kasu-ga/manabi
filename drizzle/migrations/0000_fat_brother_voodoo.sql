CREATE TABLE `card` (
	`id` text PRIMARY KEY NOT NULL,
	`desk_id` text NOT NULL,
	`front_text` text,
	`front_reading` text,
	`front_audio` text,
	`front_image` text,
	`back_text` text,
	`back_reading` text,
	`back_audio` text,
	`back_image` text,
	`created_at` integer DEFAULT 1719271355065,
	`updated_at` integer DEFAULT 1719271355065,
	`last_review_date` integer,
	`last_performance_rating` integer,
	`next_review_date` integer,
	`is_new` integer DEFAULT 0,
	FOREIGN KEY (`desk_id`) REFERENCES `desk`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `code` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`session_id` text NOT NULL,
	`action` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `desk` (
	`id` text PRIMARY KEY DEFAULT '58oz6xglxtlrvsq' NOT NULL,
	`created_at` integer DEFAULT 1719271355065,
	`updated_at` integer DEFAULT 1719271355065,
	`name` text NOT NULL,
	`user_id` text NOT NULL,
	`last_review_date` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`user_id` text NOT NULL,
	`restricted` integer NOT NULL,
	`limited` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);