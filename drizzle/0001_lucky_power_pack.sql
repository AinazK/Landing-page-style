CREATE TABLE `metric_totals` (
	`key` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`event` text NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `applications` ADD `platform` text;--> statement-breakpoint
ALTER TABLE `applications` ADD `priority` text;--> statement-breakpoint
ALTER TABLE `applications` ADD `route_summary` text;