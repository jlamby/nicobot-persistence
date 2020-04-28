USE nico_dev_db;

CREATE TABLE `user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` CHAR(50) NOT NULL,
  `token` CHAR(15) NOT NULL,
  UNIQUE INDEX `token` (`token`),
  INDEX `id` (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;;

CREATE TABLE `message` (
  `idmessage` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `message` TEXT NOT NULL,
  `channel` VARCHAR(10) NOT NULL DEFAULT 'zqsd',
  `timestamp` BIGINT(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`idmessage`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

CREATE TABLE `link` (
  `idlink` INT(11) NOT NULL AUTO_INCREMENT,
  `link` TEXT NOT NULL,
  `count` INT(11) NULL DEFAULT '1',
  PRIMARY KEY (`idlink`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

CREATE TABLE `happy_geek_time` (
  `userId` VARCHAR(20) NOT NULL,
  `channelId` VARCHAR(20) NOT NULL,
  `year` SMALLINT(6) NOT NULL,
  `week` TINYINT(4) NOT NULL
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

CREATE TABLE `gommette` (
  `userId` VARCHAR(20) NOT NULL,
  `giverId` VARCHAR(20) NOT NULL,
  `reason` TEXT NOT NULL,
  `type` TINYINT(4) NOT NULL,
  `yesCount` TINYINT(4) NOT NULL DEFAULT 0,
  `noCount` TINYINT(4) NOT NULL DEFAULT 0,
  `creationDate` DATETIME NOT NULL,
  `valid`BOOLEAN NOT NULL
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


INSERT INTO user (name, token) VALUES ('development', 'dev');
INSERT INTO message (username, message, channel, timestamp) VALUES ('uname', 'message #1 éà$<>{}[]()', 'general', 1);
INSERT INTO message (username, message, channel, timestamp) VALUES ('uname', 'message #2', 'general', 2);
INSERT INTO link (link, count) VALUES ('https://www.google.be', 1);
INSERT INTO link (link, count) VALUES ('https://www.google.com', 2);