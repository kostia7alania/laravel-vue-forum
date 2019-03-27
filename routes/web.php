<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
const vid_cfg = [
    'SQL_user'      => 'sa',
    'SQL_pass'      => '0133vfhb,jh',
    'SQL_server'    => '192.168.202.102',//'NODE1',//'192.168.202.106';
    'SQL_database'  => 'kostia7forum',//'ISGS_Ex_Test',//'192.168.202.106';
];

//PDO  
try {$link = new PDO ('sqlsrv:Server='.vid_cfg['SQL_server'].';Database='.vid_cfg['SQL_database'],vid_cfg['SQL_user'],vid_cfg['SQL_pass']);} catch (PDOException $e) { echo '{status: 0, msg: "Failed to get DB handle: "'.$e->getMessage()."} "; exit;}
$parseListSQL = "SELECT 333333";//<--конвертим по очереди;
$stmt = $link->prepare($parseListSQL);
try {
  $stmt->execute();
  $row = $stmt->fetch();
    var_dump($row);
} catch(Exception $e){ echo "[SQL select ERROR->$e ]; "; die();}

    echo '[end]';
    die;
*/
Route::get('/', function () { return view('welcome'); });

Route::get('/web', function () {
    
    phpinfo(); die;
});
