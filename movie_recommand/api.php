<?php
error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 'on');
define(ACCESS_PATH,"1");
$apiData = (object)$_REQUEST;
require('db.php');
$data = new stdClass;
if(!empty($apiData->api)){
	$userId = $apiData->userId;
	if(empty($userId)) $userId=2;
	switch($apiData->api){
		case 'initSearchData':{
			$sql = "SELECT * FROM userInfo where weixinName='".$apiData->weixinName."'";
			$userInfo = DB::Fetch($sql);
			if(empty($userInfo)){
				$sql = "INSERT INTO userInfo(userId,weixinName,userName,nickName,sex,age,birthday,star,company,school,iphone,email,sign) VALUES(null,'$apiData->userName','','',0,0,'','','','',0,'','')";
				$userId = DB::ExecFetchId($sql);
				$userInfo = new stdclass;
				$userInfo->userId = $userId;
				$userInfo->weixinName = $apiData->weixinName;
			}else{
				$userId = $userInfo->userId;
			}
			$sql = "SELECT movieName FROM search_moviename where userId='".$userId."' limit 1";
			$result = DB::Fetch($sql);
			if(empty($result)){
				$movieNameList = array('速度与激情8', '喜欢你', '大话西游', '美女与野兽', '非凡任务', '这个杀手不太冷', '绑架者', '金刚狼3', '傲娇与偏见', '万能钥匙', '你的名字');
				foreach($movieNameList as $i=>$name){
					$sql = "INSERT INTO search_moviename(userId,movieName,searchCnt) VALUES('$userId','$name',".(12-$i).")";
					DB::exec($sql);
				}
				$typeList = array('喜剧','动作','爱情','动画','犯罪','剧情','悬疑','冒险','古装','奇幻','科幻','惊悚','恐怖','家庭');
				foreach($typeList as $i=>$type){
					$sql = "INSERT INTO search_movietype(userId,movieTypeName,searchCnt) VALUES('$userId','$type',".(15-$i).")";
					DB::exec($sql);
				}
				$peopleList = array('宫崎骏','周星驰','周迅','邓超');
				foreach($peopleList as $i=>$person){
					$sql = "INSERT INTO search_peoplename(userId,peopleName,searchCnt) VALUES('$userId','$person',".(5-$i).")";
					DB::exec($sql);
				}
			}

			$sql = "select movieId from collection_movie where userId=".$userId." order by collect_time DESC";
			
			$result = DB::FetchAll($sql);
			$movieIdList = array();
			if(!empty($result)){
				foreach($result as $res){
					$movieIdList[] = $res->movieId;
				}
			}

			$sql = "select peopleId from collection_people where userId=".$userId." order by collect_time DESC";
			$result = DB::FetchAll($sql);
			$peopleIdList = array();
			if(!empty($result)){
				foreach($result as $res){
					$peopleIdList[] = $res->peopleId;
				}
			}

			$retData = new stdclass;
			$retData->userInfo = $userInfo;
			$retData->movieNameList = $movieIdList;
			$retData->personList = $peopleIdList;
			$data->Data = $retData;
			$data->Code = 0;
		}break;
		case 'updateUserInfo':{
			$sex = $apiData->gender=="男"?0:1;
			$sql = "UPDATE userInfo SET userName='".$apiData->name."',nickName='".$apiData->nickName."',sex='".$sex."',age='".$apiData->age."',birthday='".$apiData->birthday."',star='".$apiData->constellation."',company='".$apiData->company."',school='".$apiData->school."',iphone='".$apiData->tel."',email='".$apiData->email."',sign='".$apiData->intro."' where userId=".$userId;
			DB::exec($sql);
			$sql = "SELECT * from userInfo where userId=".$userId;
			$userInfo = DB::Fetch($sql);
			$data->Code = 0;
			$data->Data = $userInfo;
		}break;
		case 'collectMovie':{
			$sql = "INSERT INTO collection_movie(userId,movieId,collect_time) VALUES($userId,$apiData->movieId,'".date('Y-m-d H:i:s')."')";
			DB::exec($sql);
			$data->Code = 0;
		}break;
		case 'disCollectMovie':{
			$sql = "DELETE FROM collection_movie WHERE userId=".$userId." and movieId=".$apiData->movieId;
			DB::exec($sql);
			$data->Code = 0;
		}break;
		case 'collectPeople':{
			$sql = "INSERT INTO collection_people(userId,peopleId,collect_time) VALUES($userId,$apiData->peopleId,'".date('Y-m-d H:i:s')."')";
			DB::exec($sql);
			$data->Code = 0;
		}break;
		case 'disCollectPeople':{
			$sql = "DELETE FROM collection_people WHERE userId=".$userId." and movieId=".$apiData->movieId;
			DB::exec($sql);
			$data->Code = 0;
		}break;
		case 'getCollectMovieList':{
			$sql = "select movieId from collection_movie where userId=".$userId." order by collect_time DESC";
			$result = DB::FetchAll($sql);
			$movieIdList = array();
			if(!empty($result)){
				foreach($result as $res){
					$movieIdList[] = $res->movieId;
				}
			}
			$data->Code =0;
			$data->Data = $movieIdList;
		}break;
		case 'getCollectPeopleList':{
			$sql = "select peopleId from collection_people where userId=".$userId." order by collect_time DESC";
			$result = DB::FetchAll($sql);
			$peopleIdList = array();
			if(!empty($result)){
				foreach($result as $res){
					$peopleIdList[] = $res->peopleId;
				}
			}
			$data->Code =0;
			$data->Data = $peopleIdList;
		}break;
		case 'getSearchMovieName':{
			$sql = "SELECT movieName from search_moviename where userId=".$userId." order by searchCnt DESC limit 10";
			$result = DB::FetchAll($sql);
			$movieNameList = array();
			if(!empty($result)){
				foreach($result as $res){
					$movieNameList[] = $res->movieName;
				}
			}
			$data->Code =0;
			$data->Data = $movieNameList;
		}break;
		case 'getSearchTypeName':{
			$sql = "SELECT movieTypeName from search_movietype where userId=".$userId." order by searchCnt DESC limit 5";
			$result = DB::FetchAll($sql);
			$movieNameList = array();
			if(!empty($result)){
				foreach($result as $res){
					$movieNameList[] = $res->movieTypeName;
				}
			}
			$data->Code =0;
			$data->Data = $movieNameList;
		}break;
		case 'getSearchPersonName':{
			$sql = "SELECT peopleName from search_peoplename where userId=".$userId." order by searchCnt DESC limit 10";
			$result = DB::FetchAll($sql);
			$peopleNameList = array();
			if(!empty($result)){
				foreach($result as $res){
					$peopleNameList[] = $res->peopleName;
				}
			}
			$data->Code =0;
			$data->Data = $peopleNameList;
		}break;
		case 'UpdateSearchMovieName':{
			$movieName = $apiData->movieName;
			if(!empty($movieName)){
				$sql = "SELECT movieName FROM search_moviename where userId=".$userId." and movieName='".$movieName."'";
				$res = DB::Fetch($sql);
				if(empty($res)){
					$sql = "INSERT INTO search_moviename(userId,movieName,searchCnt) VALUES($userId,'".$movieName."',1)";
				}else{
					$sql = "UPDATE search_moviename SET searchCnt=searchCnt+1 WHERE userId=".$userId." and movieName='".$movieName."'";	
				}
				DB::exec($sql);
				$data->Code = 0;
			}else{
				$data->Code =  -2;
			}
		}break;
		case 'UpdateSearchTypeName':{
			$typeName = $apiData->movieTypeName;
			if(!empty($typeName)){
				$sql = "SELECT movieTypeName FROM search_movietype where userId=".$userId." and movieTypeName='".$typeName."'";
				$res = DB::Fetch($sql);
				if(!empty($res)){
					$sql = "UPDATE search_movietype SET searchCnt=searchCnt+1 WHERE userId=".$userId." and movieTypeName='".$typeName."'";	
					DB::exec($sql);
				}
				$data->Code = 0;
			}else{
				$data->Code =  -2;
			}
		}break;
		case 'UpdateSearchPeopleName':{
			$peopleName = $apiData->peopleName;
			if(!empty($peopleName)){
				$sql = "SELECT peopleName FROM search_peoplename where userId=".$userId." and peopleName='".$peopleName."'";
				$res = DB::Fetch($sql);
				if(empty($res)){
					$sql = "INSERT INTO search_peoplename(userId,peopleName,searchCnt) VALUES($userId,'".$peopleName."',1)";
				}else{
					$sql = "UPDATE search_peoplename SET searchCnt=searchCnt+1 WHERE userId=".$userId." and peopleName='".$peopleName."'";	
				}
				DB::exec($sql);
				$data->Code = 0;
			}else{
				$data->Code =  -2;
			}
		}break;
		case 'getSkinInfo':{
			$sql = "SELECT skinId FROM user_skin where userId=".$userId;
			$info = DB::Fetch($sql);
			$skinId= 0;
			if(!empty($info)){
				$skinId =  $info->skinId;
			}
			$data->Code = 0;
			$data->Data = $skinId;
		}break;
		case 'updateSkinInfo':{
			$sql = "SELECT skinId FROM user_skin where userId=".$userId;
			$info = DB::Fetch($sql);
			if(empty($info)){
				$sql = "INSERT INTO user_skin(userId,skinId) values($userId,$apiData->skinId)";				
			}else{
				$sql = "UPDATE user_skin SET skinId=$apiData->skinId where userId=".$userId;
			}
			DB::exec($sql);
			$data->Code = 0;
		}break;
		case 'uploadPic':{
			if(!empty($_FILES['file'])){
				$typeList = explode("/",$_FILES['file']['type']);
				$fileName = time().".".$typeList[1];
				$dir="/data/www/chinasouhu/movie/images/";
				if(move_uploaded_file($_FILES['file']['tmp_name'],$dir.$fileName)){
					$sql = "select gallery_name FROM  gallery where userId=".$userId;
					$info = DB::Fetch($sql);
					if(empty($info)){
						$sql = "INSERT INTO gallery(userId,gallery_name) values($userId,'$fileName')";
					}else{
						$new_gallery_name = $info->gallery_name.",".$fileName;
						$sql = "UPDATE gallery SET gallery_name='".$new_gallery_name."' WHERE userId=".$userId;
					}
					DB::exec($sql);
					$data->Code = 0;
					$data->Data = $fileName;
				}else{
					$data->Code = -3;
				}
			}
		}break;
		case 'getUploadList':{
			$sql = "select gallery_name FROM  gallery where userId=".$userId;
			$info = DB::Fetch($sql);
			if(!empty($info)) $galleryList = explode(",",$info->gallery_name);
			else $galleryList = array();
			$data->Data = $galleryList;
			$data->Code = 0;
		}break;
	}
}else{
	$data->Code = -1;
}
echo json_encode($data);
?>