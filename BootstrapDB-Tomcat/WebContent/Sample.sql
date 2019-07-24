CREATE DATABASE  IF NOT EXISTS `sample` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sample`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win32 (x86)
--
-- Host: localhost    Database: sample
-- ------------------------------------------------------
-- Server version	5.6.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pdf_utenti`
--

DROP TABLE IF EXISTS `pdf_utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pdf_utenti` (
  `idpdf_utente` int(11) NOT NULL AUTO_INCREMENT,
  `idutente` int(11) NOT NULL DEFAULT '0',
  `sesso` varchar(1) NOT NULL,
  `datanascita` date NOT NULL,
  `luogonascita` varchar(255) NOT NULL DEFAULT '',
  `provincianascita` varchar(2) NOT NULL,
  `codfiscale` varchar(16) NOT NULL,
  `datacompilazione` date NOT NULL,
  `dataassunzione` date NOT NULL,
  `mansione` varchar(255) NOT NULL,
  `specializzazioni` varchar(2048) NOT NULL DEFAULT '',
  `esigenze` varchar(2048) NOT NULL DEFAULT '',
  `titolostudio` varchar(255) NOT NULL DEFAULT '',
  `datadimissione` date DEFAULT NULL,
  PRIMARY KEY (`idpdf_utente`),
  KEY `FK_PDF_UTENTI_idutente_idx` (`idutente`),
  CONSTRAINT `FK_PDF_UTENTI_idutente` FOREIGN KEY (`idutente`) REFERENCES `utenti` (`idutente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdf_utenti`
--

LOCK TABLES `pdf_utenti` WRITE;
/*!40000 ALTER TABLE `pdf_utenti` DISABLE KEYS */;
INSERT INTO `pdf_utenti` VALUES (2,8,'M','1958-02-28','Nascita 1','NN','AAABBB00C00D000X','2019-01-01','2019-01-10','Direttore responsabile ricerca e sviluppo','','','',NULL),(3,12,'F','1957-02-10','Nascita 2','NN','AAABBB00C00D000X','2019-01-02','2019-01-11','Responsabile Acquisti Approvigionatore','','','',NULL),(5,27,'M','1973-12-06','Nascita 3','NN','AAABBB00C00D000X','2019-01-03','2019-01-12','Tecnico Project Manager','','','',NULL),(9,53,'F','1964-09-24','Nascita 4','NN','AAABBB00C00D000X','2019-01-04','2019-01-13','Impiegato Tecnico  Perito Meccanico','','','',NULL),(16,83,'M','1962-09-17','Nascita 5','NN','AAABBB00C00D000X','2019-01-05','2019-01-14','Impiegato Tecnico Progettista','','','',NULL),(39,1,'F','1980-02-17','Nascita 6','NN','AAABBB00C00D000X','2019-01-06','2019-01-15','Ingegnere elettronico','','','',NULL);
/*!40000 ALTER TABLE `pdf_utenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparti`
--

DROP TABLE IF EXISTS `reparti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reparti` (
  `idreparto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` varchar(45) DEFAULT NULL,
  `idresponsabile` int(11) DEFAULT NULL,
  `cdc` int(11) DEFAULT NULL,
  `idazienda` int(11) DEFAULT NULL,
  PRIMARY KEY (`idreparto`),
  KEY `FK_REPARTI_idazienda_idx` (`idazienda`),
  KEY `FK_REPARTI_idutente_idx` (`idresponsabile`),
  CONSTRAINT `FK_REPARTI_idazienda` FOREIGN KEY (`idazienda`) REFERENCES `aziende` (`idaziende`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_REPARTI_idresponsabile` FOREIGN KEY (`idresponsabile`) REFERENCES `utenti` (`idutente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparti`
--

LOCK TABLES `reparti` WRITE;
/*!40000 ALTER TABLE `reparti` DISABLE KEYS */;
INSERT INTO `reparti` VALUES (1,'Reparto 1','RP',1,100,1),(2,'Reparto 2','RP',1,200,2),(4,'Reparto 3','RP',1,400,1),(5,'Reparto 4','RP',1,500,1),(6,'Reparto 5','RP',1,600,1),(7,'Reparto 6','RP',1,700,1);
/*!40000 ALTER TABLE `reparti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruoli`
--

DROP TABLE IF EXISTS `ruoli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ruoli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(128) NOT NULL,
  `acronimo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruoli`
--

LOCK TABLES `ruoli` WRITE;
/*!40000 ALTER TABLE `ruoli` DISABLE KEYS */;
INSERT INTO `ruoli` VALUES (1,'APPLICATION: Amministratore','APP_ADMIN'),(4,'TRASFERTE: Amministratore','TRASF_ADMIN'),(5,'TRASFERTE: Booking','TRASF_BOOKING'),(6,'TRASFERTE: Rendicontazione','TRASF_RENDICONT'),(7,'TRASFERTE: Pagamento','TRASF_PAGAMENTO'),(8,'OTL: Amministratore','OTL_ADMIN'),(9,'TABELLE: Commesse','DATA_COMMESSE'),(10,'TABELLE: Visitatori','DATA_VISITATORI'),(11,'TABELLE: Mensa','DATA_MENSA'),(12,'FUNZIONE: Formazione','FORMAZIONE'),(13,'FUNZIONE: Documenti','DOCUMENTI'),(14,'TABELLE: Utenti','DATA_UTENTI'),(18,'TABELLE: Documenti / Aree Aziendali','DATA_DOC_AREEAZIENDALI'),(19,'TABELLE: Documenti / Tipi Documenti','DATA_DOC_DOCUMENTTYPES'),(20,'TABELLE: Documenti / Famiglie prodotto','DATA_DOC_FAMILY'),(21,'TABELLE: Documenti / Lingue','DATA_DOC_LANGUAGES'),(22,'TABELLE: Documenti / Aree specifiche','DATA_DOC_SPECIFIC_REF'),(23,'FUNZIONE: Tabelle Database','TABELLE_DB');
/*!40000 ALTER TABLE `ruoli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siti`
--

DROP TABLE IF EXISTS `siti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `siti` (
  `idsito` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `iniziali` varchar(4) DEFAULT NULL,
  `deleted` int(1) DEFAULT '0',
  PRIMARY KEY (`idsito`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siti`
--

LOCK TABLES `siti` WRITE;
/*!40000 ALTER TABLE `siti` DISABLE KEYS */;
INSERT INTO `siti` VALUES (1,'Sito 1','S1',0),(2,'Sito 2','S2',0),(3,'Sito 3','S3',0),(4,'Sito 4','S4',0),(5,'Sito 5','S5',0);
/*!40000 ALTER TABLE `siti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stora_profili_orari`
--

DROP TABLE IF EXISTS `stora_profili_orari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stora_profili_orari` (
  `idstora_profili_orari` int(11) NOT NULL AUTO_INCREMENT,
  `descrizione` varchar(45) NOT NULL DEFAULT 'Profilo X',
  `ingressoTeorico` int(11) NOT NULL DEFAULT '800',
  `flessibilita` int(11) NOT NULL DEFAULT '200',
  `arrotondamentoFlessibilita` int(11) NOT NULL DEFAULT '0',
  `minimoLavorativo` int(11) NOT NULL DEFAULT '800',
  `inizioPausaMensa` int(11) NOT NULL DEFAULT '1230',
  `finePausaMensa` int(11) NOT NULL DEFAULT '1315',
  `minimoMensa` int(11) NOT NULL DEFAULT '30',
  `massimoMensa` int(11) NOT NULL DEFAULT '200',
  `uscitaTeorica` int(11) NOT NULL DEFAULT '1600',
  `bancaOre` int(11) NOT NULL DEFAULT '7',
  `manager` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idstora_profili_orari`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stora_profili_orari`
--

LOCK TABLES `stora_profili_orari` WRITE;
/*!40000 ALTER TABLE `stora_profili_orari` DISABLE KEYS */;
INSERT INTO `stora_profili_orari` VALUES (0,'No Gestione Timbrature',800,0,0,800,1200,1400,60,60,1600,0,0),(1,'Flessibile 1h',800,105,0,800,1200,1400,60,60,1600,-7,0),(2,'Standard',800,5,0,800,1200,1400,60,60,1700,0,0);
/*!40000 ALTER TABLE `stora_profili_orari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stora_utenti`
--

DROP TABLE IF EXISTS `stora_utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stora_utenti` (
  `idstora_utenti` int(11) NOT NULL AUTO_INCREMENT,
  `idutente` int(11) DEFAULT NULL,
  `storacod` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstora_utenti`),
  KEY `FK_STORA_utenti_idx` (`idutente`),
  CONSTRAINT `FK_STORA_UTENTI_idutente` FOREIGN KEY (`idutente`) REFERENCES `utenti` (`idutente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10219 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stora_utenti`
--

LOCK TABLES `stora_utenti` WRITE;
/*!40000 ALTER TABLE `stora_utenti` DISABLE KEYS */;
/*!40000 ALTER TABLE `stora_utenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `idutente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `cognome` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `idreparto` int(11) DEFAULT NULL,
  `iniziali` varchar(5) DEFAULT NULL,
  `idsito` int(11) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `cellulare` varchar(45) DEFAULT NULL,
  `deleted` int(1) DEFAULT '0',
  `idaxwin` int(11) DEFAULT '0',
  `ultimoaccesso` datetime DEFAULT NULL,
  `accessoattuale` datetime DEFAULT NULL,
  `idstora_profili_orari` int(11) NOT NULL DEFAULT '0',
  `rubrica` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idutente`),
  KEY `utenti_reparti_idx` (`idreparto`),
  KEY `utenti_sedi_idx` (`idsito`),
  CONSTRAINT `FK_UTENTI_idreparto` FOREIGN KEY (`idreparto`) REFERENCES `reparti` (`idreparto`),
  CONSTRAINT `FK_UTENTI_idsito` FOREIGN KEY (`idsito`) REFERENCES `siti` (`idsito`),
  CONSTRAINT `utenti_reparti` FOREIGN KEY (`idreparto`) REFERENCES `reparti` (`idreparto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `utenti_sedi` FOREIGN KEY (`idsito`) REFERENCES `siti` (`idsito`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20020 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'NOME 1','COGNOME 1','user1','password1','NOME 1.COGNOME 1@example.com',1,'AA1',1,'(06) 12.34.051','no mobile',0,1,'2019-07-17 14:22:58','2019-07-17 15:16:02',0,1),(2,'NOME 2','COGNOME 2','user2','password2','NOME 2.COGNOME 2@example.com',1,'AA2',2,'(06) 12.34.052','no mobile',0,1,'2017-12-06 09:19:58','2017-12-06 13:41:46',1,0),(8,'NOME 8','COGNOME 8','user8','password8','NOME 8.COGNOME 8@example.com',1,'AA8',3,'(06) 12.34.058','no mobile',0,8,'2019-07-08 17:43:52','2019-07-17 10:31:25',2,1),(12,'NOME 12','COGNOME 12','user12','password12','NOME 12.COGNOME 12@example.com',7,'AA12',4,'(06) 12.34.512','no mobile',0,12,'2019-07-16 17:15:24','2019-07-17 17:41:31',0,0),(27,'NOME 27','COGNOME 27','user27','password27','NOME 27.COGNOME 27@example.com',7,'AA27',5,'(06) 12.34.527','no mobile',0,27,'2019-07-10 17:14:18','2019-07-16 18:05:42',1,1),(53,'NOME 53','COGNOME 53','user53','password53','NOME 53.COGNOME 53@example.com',7,'AA53',1,'(06) 12.34.553','no mobile',0,53,'2019-07-15 13:23:44','2019-07-17 13:09:34',2,0),(83,'NOME 83','COGNOME 83','user83','password83','NOME 83.COGNOME 83@example.com',1,'AA83',2,'(06) 12.34.583','no mobile',0,83,'2019-07-12 16:55:49','2019-07-16 16:37:06',0,1);
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti_ruoli`
--

DROP TABLE IF EXISTS `utenti_ruoli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti_ruoli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idutente` int(11) NOT NULL DEFAULT '-1',
  `idruolo` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti_ruoli`
--

LOCK TABLES `utenti_ruoli` WRITE;
/*!40000 ALTER TABLE `utenti_ruoli` DISABLE KEYS */;
/*!40000 ALTER TABLE `utenti_ruoli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sample'
--

--
-- Dumping routines for database 'sample'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-24 14:41:47
