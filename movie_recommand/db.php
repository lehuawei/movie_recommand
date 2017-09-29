<?php
if(!defined('ACCESS_PATH')){header("HTTP/1.1 404 Not Found");die;}
class DB {
	private static $dbLink;

	private static function link() {
		if (!isset(self::$dbLink)) {
			$dsn = 'mysql:host=127.0.0.1;dbname=movie';  
			self::$dbLink = new PDO($dsn, 'movie', "123456Aa!");
		}
		return self::$dbLink;
	}

	private static function filterSql($sql) {
		return str_replace(array('/*','*/','--','#',';'),'',$sql);
	}

	public static function Fetch($sql) {
		$sql = self::filterSql($sql);
		$stmt = self::link()->query($sql);
		$result = $stmt->fetch(PDO::FETCH_OBJ);
		$stmt->closeCursor();
		return $result;
	}

	public static function FetchAll($sql) {
		$sql = self::filterSql($sql);
		$stmt = self::link()->query($sql);
		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
		$stmt->closeCursor();
		return $result;
	}

	public static function FetchColumn($sql,$column_number=0) {
		$sql = self::filterSql($sql);
		$stmt = self::link()->query($sql);
		$result = $stmt->fetchColumn($column_number);
		$stmt->closeCursor();
		return $result;
	}

	public static function Exec($sql) {
		$sql = self::filterSql($sql);
		return self::link()->exec($sql);
	}

	public static function ExecFetchId($sql,$name=null) {
		$sql = self::filterSql($sql);
		self::link()->exec($sql);
		return self::link()->lastInsertId($name);
	}

	public static function ExecTransaction($sqlArr) {
		if (empty($sqlArr) || !is_array($sqlArr)) return false;
		try {
			self::link()->beginTransaction();
			foreach($sqlArr as $sql){
				$sql = self::filterSql($sql);
				if(false === self::link()->exec($sql)){
					self::link()->rollBack();
					return false;
				}
			}
			self::link()->commit();
			return true;
		} catch(PDOException $e) {
			self::link()->rollBack();
			return false;
		}
		return false;
	}
}