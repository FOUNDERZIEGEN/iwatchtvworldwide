const player=document.getElementById("player");
const frame=document.getElementById("frame");
const slides=document.getElementById("slides");
const bigPlay=document.getElementById("bigPlay");
const tapOverlay=document.getElementById("tapOverlay");

let hls=null,shakaPlayer=null,currentIndex=0;

// Channels array (MPD no key & MPD with key supported)
const channels=[
{name:"Sdtv Network",type:"m3u8",logo:"https://i.imgur.com/gzQ9sFM.jpeg",src:"https://sdtvnetworkph.sanmateocable.workers.dev/playlist.m3u8"},   
{name:"Sdtv Hd",type:"m3u8",logo:"https://i.imgur.com/oE9jora.jpeg",src:"https://live20.bozztv.com/giatvplayout7/giatv-211473/tracks-v1a1/mono.ts.m3u8"}, 
{name:"Sdtv Radio",type:"m3u8",logo:"https://i.imgur.com/VOBlE8Y.jpeg",src:"https://usa2.server2028.com/hls/sdtv_radio/live.m3u8"},
{name:"Alltv2",type:"mpd",drm:true,keyId:"31363233323238353336303333363036",key:"367662564c69425947353948374f4553",logo:"https://i.imgur.com/9093ago.jpeg",src:"https://converse.nathcreqtives.com/1179/manifest.mpd?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzczMDE1NjMzLCJleHAiOjE3NzQwNzc2NTgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc3NDA3NzY1OH0.rIytn71LR0JrQotL7kVoIPO3ppFXjERc9GpbbUhmm9w"},
{name:"Jeepney Tv",type:"mpd",drm:true,keyId:"dc9fec234a5841bb8d06e92042c741ec",key:"225676f32612dc803cb4d0f950d063d0",logo:"https://i.imgur.com/d7VflLp.jpeg",src:"https://abslive.akamaized.net/dash/live/2027618/jeepneytv/manifest.mpd"},
  {name:"HypeTV",type:"m3u8",logo:"https://i.imgur.com/PfqrJEf.png",src:"https://live20.bozztv.com/giatvplayout7/giatv-211468/tracks-v1a1/mono.ts.m3u8"},
 {name:"Golden Tv",type:"m3u8",logo:"https://i.imgur.com/9EGqMKY.jpeg",src:"https://goldentelevisionnetwork.sanmateocable.workers.dev/playlist.m3u8"}, 
  {name:"3rs Sine Pinoy",type:"m3u8",logo:"https://i.imgur.com/RS1PrEo.png",src:"https://live20.bozztv.com/giatvplayout7/giatv-210267/tracks-v1a1/mono.ts.m3u8"}, 
{name:"3rs MovieBox",type:"m3u8",logo:"https://i.imgur.com/b4rjf8n.png",src:"https://live20.bozztv.com/giatvplayout7/giatv-210731/tracks-v1a1/mono.ts.m3u8"},
{name:"3rs Tv",type:"m3u8",logo:"https://i.imgur.com/50RyQA7.jpeg",src:"https://live20.bozztv.com/giatvplayout7/giatv-210631/tracks-v1a1/mono.ts.m3u8"},
{name:"3rs Cartoon Movies",type:"m3u8",logo:"https://i.imgur.com/OMGlC4R.png",src:"https://live20.bozztv.com/giatvplayout7/giatv-211507/tracks-v1a1/mono.ts.m3u8"},
{name:"Juzt Tv",type:"m3u8",logo:"https://i.imgur.com/HmK3hm3.png",src:"https://live20.bozztv.com/giatvplayout7/giatv-210639/tracks-v1a1/mono.ts.m3u8"},
 {name:"Star Tv Philippines",type:"m3u8",logo:"https://i.imgur.com/4iJ8xHq.jpeg",src:"https://startvphilippines.sanmateocable.workers.dev/playlist.m3u8"},  
 {name:"TV5",type:"mpd",drm:true,keyId:"2615129ef2c846a9bbd43a641c7303ef",key:"07c7f996b1734ea288641a68e1cfdc4d",logo:"https://i.imgur.com/70wHkDj.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/tv5_hd/default1/index.mpd"},
{name:"Kapatid Channel",type:"mpd",drm:true,keyId:"dbf670bed2ea4905a114557e90e7ffb6",key:"616059bec8dfb27f3524b7e7c31b6cff",logo:"https://i.imgur.com/ov0JO06.jpeg",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/pphd_sdi1/default/index.mpd"},
{name:"Rptv",type:"mpd",drm:true,keyId:"31363231383439313133323034313530",key:"78645370476a496d5756385231474332",logo:"https://i.imgur.com/Qh9pMXc.png",src:"https://converse.nathcreqtives.com/1094/manifest.mpd?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzczMDE1NjMzLCJleHAiOjE3NzQwNzc2NTgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc3NDA3NzY1OH0.rIytn71LR0JrQotL7kVoIPO3ppFXjERc9GpbbUhmm9w"},
{name:"Will Tv",type:"mpd",drm:true,keyId:"b1773d6f982242cdb0f694546a3db26f",key:"ae9a90dbea78f564eb98fe817909ec9a",logo:"https://i.imgur.com/v87MSbU.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/wiltv/default/index.mpd"},
{name:"Kapamilya Channel",type:"mpd",drm:true,keyId:"31363331363737343637333533323837",key:"71347339457958556439543650426e74",logo:"https://i.imgur.com/S2FCXzr.png",src:"https://converse.nathcreqtives.com/1286/manifest.mpd?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzczMDE1NjMzLCJleHAiOjE3NzQwNzc2NTgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc3NDA3NzY1OH0.rIytn71LR0JrQotL7kVoIPO3ppFXjERc9GpbbUhmm9w"},
{name:"Gma",type:"mpd",logo:"https://i.imgur.com/z2rl3df.jpeg",src:"https://gsattv.akamaized.net/live/media0/gma7/Widevine/gma7.mpd"},
 {name:"Gtv",type:"mpd",logo:"https://i.imgur.com/aeWyCsh.jpeg",src:"https://www.maruyatvph.com/converge/index.php/gtv.mpd?token=66e144f93532"},
{name:"Gma Pinoy Tv",type:"mpd",logo:"https://i.imgur.com/zUhUdDq.png",src:"https://amg01006-abs-cbn-abscbn-gma-x7-dash-abscbnono-dzsx9.amagi.tv/index.mpd"},
 {name:"Net25",type:"mpd",logo:"https://i.imgur.com/23hbSGd.png",src:"https://www.maruyatvph.com/converge/index.php/net25.mpd?token=66e144f93532"},
{name:"Dzrh Tv",type:"mpd",logo:"https://i.imgur.com/5tshNjy.png",src:"https://www.maruyatvph.com/converge/index.php/dzrhtv.mpd?token=66e144f93532"}, 
{name:"Ocn 1",type:"mpd",drm:true,keyId:"817839de27764deb879c65c571c19226",key:"2b1443f33c919c89429a21259974a224",logo:"https://i.imgur.com/dQRCCCd.png",src:"https://ocnmovies-drm2-mcdn.tving.com/ocnmovies_drm/live5000.smil/manifest.mpd"},
{name:"Ocn 2",type:"mpd",drm:true,keyId:"a97de619e5834e6da10c9bab768fc626",key:"1452d46b8ecd87b38310ce90d4f5209f",logo:"https://i.imgur.com/dQRCCCd.png",src:"https://ocnmovies2-drm2-mcdn.tving.com/ocnmovies2_drm/live5000.smil/manifest.mpd"},
{name:"Iqiyi",type:"mpd",drm:true,keyId:"7ef7e913ce85a1131b27036069169a10",key:"77d98ed71db7524c27875a09a975f9e6",logo:"https://i.imgur.com/TMv0tPh.jpeg",src:"https://linearjitp-playback.astro.com.my/dash-wv/linear/1006/default_ott.mpd"},
{name:"Asian Hits",type:"mpd",drm:true,keyId:"dac6cbd9d17a451bb76386f52469e0e9",key:"2e2ac52cadf843459915eaa1a9b95e48",logo:"https://i.imgur.com/vzn3wGw.jpeg",src:"https://cnt1-streamer14.cdn.3bbtv.com:8443/3bb/live/101/101.mpd"},
{name:"One Ph",type:"mpd",drm:true,keyId:"92834ab4a7e1499b90886c5d49220e46",key:"a7108d9a6cfcc1b7939eb111daf09ab3",logo:"https://i.imgur.com/NSvivIm.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/oneph_sd/default/index.mpd"},
{name:"One News",type:"mpd",drm:true,keyId:"d39eb201ae494a0b98583df4d110e8dd",key:"6797066880d344422abd3f5eda41f45f",logo:"https://i.imgur.com/U5OCKh8.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/onenews_hd1/default/index.mpd"},
{name:"Sari Sari",type:"mpd",drm:true,keyId:"0a7ab3612f434335aa6e895016d8cd2d",key:"b21654621230ae21714a5cab52daeb9d",logo:"https://i.imgur.com/upWnLA0.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_sarisari/default/index.mpd"},
{name:"Buko",type:"mpd",drm:true,keyId:"d273c085f2ab4a248e7bfc375229007d",key:"7932354c3a84f7fc1b80efa6bcea0615",logo:"https://i.imgur.com/kdHSPT3.jpeg",src:"https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/cg_buko_sd/default/index.mpd"},
{name:"True Tv",type:"mpd",drm:true,keyId:"0559c95496d44fadb94105b9176c3579",key:"40d8bb2a46ffd03540e0c6210ece57ce",logo:"https://i.imgur.com/AHJp9KM.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/truefm_tv/default/index.mpd"},
{name:"Pba Rush",type:"mpd",drm:true,keyId:"76dc29dd87a244aeab9e8b7c5da1e5f3",key:"95b2f2ffd4e14073620506213b62ac82",logo:"https://i.imgur.com/teHrqAN.jpeg",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_pbarush_hd1/default/index.mpd"},
{name:"One Sports Plus",type:"mpd",drm:true,keyId:"f00bd0122a8a4da1a49ea6c49f7098ad",key:"a4079f3667ba4c2bcfdeb13e45a6e9c6",logo:"https://i.imgur.com/vKqZAte.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_onesportsplus_hd1/default/index.mpd"},
{name:"One Sports Hd",type:"mpd",drm:true,keyId:"31363231353030333331313038333030",key:"6c3543424b356d575851357961596873",logo:"https://i.imgur.com/CzHITOm.png",src:"https://converse.nathcreqtives.com/1083/manifest.mpd?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzczMDE1NjMzLCJleHAiOjE3NzQwNzc2NTgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc3NDA3NzY1OH0.rIytn71LR0JrQotL7kVoIPO3ppFXjERc9GpbbUhmm9w"},
{name:"Uaap Ch.",type:"mpd",drm:true,keyId:"95588338ee37423e99358a6d431324b9",key:"6e0f50a12f36599a55073868f814e81e",logo:"https://i.imgur.com/qoQhGsX.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cg_uaap_cplay_sd/default/index.mpd"},
{name:"Nba Ph",type:"mpd",drm:true,keyId:"c5e51f41ceac48709d0bdcd9c13a4d88",key:"20b91609967e472c27040716ef6a8b9a",logo:"https://i.imgur.com/IRv3tSI.png",src:"https://qp-pldt-live-bpk-02-prod.akamaized.net/bpk-tv/cgnl_nba/default/index.mpd"},
{name:"Pbo",type:"mpd",drm:true,keyId:"dcbdaaa6662d4188bdf97f9f0ca5e830",key:"31e752b441bd2972f2b98a4b1bc1c7a1",logo:"https://i.imgur.com/hh2EP86.png",src:"https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/pbo_sd/default/index.mpd"},
{name:"Cinemaone Global",type:"mpd",logo:"https://i.imgur.com/0EYKkIZ.jpeg",src:"https://d9rpesrrg1bdi.cloudfront.net/out/v1/93b9db7b231d45f28f64f29b86dc6c65/index.mpd"},
{name:"Cinemo Global",type:"m3u8",logo:"https://i.imgur.com/LLMx6Um.png",src:"https://d1bail49udbz1k.cloudfront.net/out/v1/78e282e04f0944f3ad0aa1db7a1be645/index_3.m3u8"},  
{name:"Dzmm Teleradyo",type:"mpd",logo:"https://i.imgur.com/a7arJmp.jpeg",src:"https://d14c00opfjb50c.cloudfront.net/out/v1/0fa4eb67579d41cca4ed146c93aa855f/index.mpd"},
{name:"Hits Movies",type:"mpd",drm:true,keyId:"f56b57b32d7e4b2cb21748c0b56761a7",key:"3df06a89aa01b32655a77d93e09e266f",logo:"https://i.imgur.com/FEHwzDt.jpeg",src:"https://qp-pldt-live-grp-12-prod.akamaized.net/out/u/dr_hitsmovies.mpd"},
 {name:"Tap Action Flix",type:"mpd",drm:true,keyId:"bee1066160c0424696d9bf99ca0645e3",key:"f5b72bf3b89b9848de5616f37de040b7",logo:"https://i.imgur.com/8AknaDC.jpeg",src:"https://qp-pldt-live-bpk-01-prod.akamaized.net/bpk-tv/cg_tapactionflix_hd1/default/index.mpd"},
{name:"Anc Global",type:"mpd",logo:"https://i.imgur.com/ut8Ovi0.png",src:"https://d3cjss68xc4sia.cloudfront.net/out/v1/89ea8db23cb24a91bfa5d0795f8d759e/index.mpd"}, 
{name:"Tfc Asia",type:"mpd",logo:"https://i.imgur.com/MHeHxam.png",src:"https://d1facupi3cod3q.cloudfront.net/out/v1/e3633f8591e248b0af1af15a474bfa4a/index.mpd"}, 
 {name:"I Heart Movies",type:"m3u8",logo:"https://i.imgur.com/PyvCh4E.jpeg",src:"https://hls.nathcreqtives.com/playlist.m3u8?id=2&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzY4NzM5MzExLCJleHAiOjE3Njk2ODExMzgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc2OTY4MTEzOH0.1QbEssPDWtE907qcc0jmajtd3JVsQB57vb9Tv0wP2BM"}, 
 {name:"I Heart of Asia",type:"m3u8",logo:"https://i.imgur.com/RRuqUh1.png",src:"https://hls.nathcreqtives.com/playlist.m3u8?id=1&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJNb29uIiwiaWF0IjoxNzY4NzM5MzExLCJleHAiOjE3Njk2ODExMzgsImFjY291bnRFeHBpcmVkIjpmYWxzZSwiYWNjb3VudEV4cGlyZXNBdCI6MTc2OTY4MTEzOH0.1QbEssPDWtE907qcc0jmajtd3JVsQB57vb9Tv0wP2BM"},
 {name:"Abante Tv",type:"m3u8",logo:"https://i.imgur.com/jCE7luW.png",src:"https://amg19223-amg19223c12-amgplt0352.playout.now3.amagi.tv/playlist/amg19223-amg19223c12-amgplt0352/playlist.m3u8"}, 
 {name:"Bilyonaryo",type:"m3u8",logo:"https://i.imgur.com/W00t4Qn.png",src:"https://amg19223-amg19223c11-amgplt0352.playout.now3.amagi.tv/ts-eu-w1-n2/playlist/amg19223-amg19223c11-amgplt0352/playlist.m3u8"}, 
  {name:"Myx",type:"mpd",logo:"https://i.imgur.com/ro6SAsn.png",src:"https://d24xfhmhdb6r0q.cloudfront.net/out/v1/e897a7b6414a46019818ee9f2c081c4f/index.mpd"},
 {name:"Premier Sports",type:"m3u8",logo:"https://i.imgur.com/FwqZXUg.jpeg",src:"https://amg19223-amg19223c3-amgplt0351.playout.now3.amagi.tv/ts-eu-w1-n2/playlist/amg19223-amg19223c3-amgplt0351/playlist.m3u8"}, 
{name:"Premier Spoprts2",type:"m3u8",logo:"https://i.imgur.com/lW15PhX.jpeg",src:"https://amg19223-amg19223c4-amgplt0351.playout.now3.amagi.tv/ts-eu-w1-n2/playlist/amg19223-amg19223c4-amgplt0351/playlist.m3u8"},
  {name:"Extrem Sports",type:"m3u8",logo:"https://i.imgur.com/S6WRVbP.jpeg",src:"https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/e0b81a5c-6ab5-48cd-aaa9-f82de4ab5bf9/manifest.m3u8"},
 {name:"Star Cinema",type:"m3u8",logo:"https://i.imgur.com/Auq7Mk9.jpeg",src:"https://ssai.aniview.com/api/v1/hls/stream.m3u8?AVS_SSAIID=6743dbc3fb7aa20b270802ff&AV_CHANNEL_NAME=Starmedia&AV_CONTENT_LANGUAGE=en&AV_CONTENT_RATING=TV-PG&AV_CONTENT_GENERE=907&cb=1760690422298&AV_APPPKGNAME=com.seraphic.metaxplay&AV_APPNAME=MetaX"}, 
 {name:"Home Network",type:"mpd",drm:true,keyId:"7a038d04b7d0dd22c82ea624723b0b8e",key:"3240f2e23952c853d4eda4f0675ee13d",logo:"https://i.imgur.com/egGLUE0.jpeg",src:"https://live.corusdigitaldev.com/groupd/live/fa24b652-0688-4813-b6d8-bb25998cacb1/corus-home.isml/.mpd"},
{name:"Strawberry Shortcake",type:"m3u8",logo:"https://i.imgur.com/1oEQWvQ.png",src:"https://d1si3n1st4nkgb.cloudfront.net/manifest/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod_default_samsungtvplus-xumo/96a9d3b0-ee91-4a47-acb4-6c8d19d775c1/5.m3u8"},
{name:"Hbo",type:"mpd",logo:"https://i.imgur.com/kW5ApOn.jpeg",src:"https://cdn10jtedge.indihometv.com/atm/DASH/hbo/manifest.mpd"},
{name:"Kix",type:"mpd",logo:"https://i.imgur.com/fcDVnwH.png",src:"https://cdn10jtedge.indihometv.com/atm/DASH/kix/manifest.mpd"},
{name:"Axn",type:"mpd",logo:"https://i.imgur.com/BM5LmFM.png",src:"https://cdn10jtedge.indihometv.com/atm/DASH/axn/manifest.mpd"},
{name:"Food Network",type:"mpd",logo:"https://i.imgur.com/3FXM1A5.png",src:"https://cachehsi2b.netplus.ch/tok_eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzY5MzE4MDk3Iiwic2lwIjoiIiwicGF0aCI6Ii9saXZlL2Vkcy9mb29kbmV0d29yay9icm93c2VyLWRhc2gvIiwic2Vzc2lvbl9jZG5faWQiOiIyZjgxZjc1MzJkMmM0ZDhlIiwic2Vzc2lvbl9pZCI6IiIsImNsaWVudF9pZCI6IiIsImRldmljZV9pZCI6IiIsIm1heF9zZXNzaW9ucyI6MCwic2Vzc2lvbl9kdXJhdGlvbiI6MCwidXJsIjoiaHR0cHM6Ly8xMC4wLjIyOS4xOCIsInNlc3Npb25fdGltZW91dCI6MCwiYXVkIjoiMyIsInNvdXJjZXMiOlsxMDBdfQ==.n0TSNEQvNg3rR4JIT_nOAoT4B6eX3E68jz4sSMUNC6y6EhCZw_jPjAy9uZB0iWb9_0JLE7Ta6I2kD77UNQY5yA==/live/eds/foodnetwork/browser-dash/foodnetwork.mpd"}, 
{name:"Outdoor Channel",type:"m3u8",logo:"https://i.imgur.com/bdoThwg.png",src:"https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00718-outdoorchannela-outdoortvnz-samsungnz/playlist.m3u8"}, 
{name:"Movies Now",type:"mpd",drm:true,keyId:"40f019b86241d23ef075633fd7f1e927",key:"058dec845bd340178a388edd104a015e",logo:"https://bestmediainfo.com/uploads/2017/08/MOVIES-NOW-LOGO_6.jpg",src:"https://times-ott-live.akamaized.net/moviesnow_wv_drm/index.mpd"},
 {name:"Mnx",type:"mpd",drm:true,keyId:"40f019b86241d23ef075633fd7f1e927",key:"058dec845bd340178a388edd104a015e",logo:"https://i.imgur.com/9QSwrlt.jpeg",src:"https://times-ott-live.akamaized.net/mnxhd_wv_drm/index.mpd"},
 {name:"Mn+",type:"mpd",drm:true,keyId:"40f019b86241d23ef075633fd7f1e927",key:"058dec845bd340178a388edd104a015e",logo:"https://i.imgur.com/1vKAozn.png",src:"https://times-ott-live.akamaized.net/mnplus_wv_drm/index.mpd"},
 {name:"Romedy Now",type:"mpd",drm:true,keyId:"40f019b86241d23ef075633fd7f1e927",key:"058dec845bd340178a388edd104a015e",logo:"https://i.imgur.com/dkQDLtH.jpeg",src:"https://times-ott-live.akamaized.net/romedynow_wv_drm/index.mpd"},
{name:"Cinemax",type:"mpd",logo:"https://i.imgur.com/BjZlCxc.png",src:"https://cdn10jtedge.indihometv.com/atm/DASH/cinemax/manifest.mpd"},
{name:"Studio Universal",type:"mpd",drm:true,keyId:"77b7711693a9f32c0bd81ef8782f716b",key:"0802df5ea0615ca2638b3b38f9ab3926",logo:"https://i.imgur.com/kqhKccm.jpeg",src:"https://zap-live1-ott.izzigo.tv/1/out/u/dash/STUDIO-UNIVERSAL-HD/default.mpd"}, 
 {name:"K+",type:"mpd",logo:"https://i.imgur.com/U3kDgTq.jpeg",src:"https://cdn10jtedge.indihometv.com/atm/DASH/kplus/manifest.mpd"},
  {name:"Thrill",type:"mpd",logo:"https://i.imgur.com/n1Mu2Q5.jpeg",src:"https://cdn10jtedge.indihometv.com/atm/DASH/thrill/manifest.mpd"},
  {name:"Ion Tv",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Ion_logo.svg/512px-Ion_logo.svg.png",src:"https://fl7.moveonjoy.com/ION_TV/tracks-v1a1/mono.ts.m3u8"},
 {name:"Ion Plus",type:"m3u8",logo:"https://i.imgur.com/1dgCvNE.png",src:"https://d34lnyh33n4440.cloudfront.net/playlist/amg01438-ewscrippscompan-ionplus-tablo/cb543d1c7f6c648e9cd43e6fd7ef41a2f9591fde1d6988693eb5518975d1073edce2a59caa08ff16388f1ede7f0a66413a3e951fda77118fd87eb141453c5728cfffe729a2c05616b7db083429b56a062a866a68ac39437ed0e21f48a238b6720a5aa82a66443d80b846ac7251db80148b61299bce8c37683f03409a5e5afba358b1ebb45940db68f3b11b55c32847e39f43c8821ca689d55a9f5e8527f71ccbc1f782801781d2f32993728aecdb5f581fa9a83bf8f955bfd6937929957f2d556c3a8cc1b2cd3ef702da21269cded8b664857fa64dab861251960196468831c81cc2f64f4a2dd2cfeb8f382d14a1d0496e678de4ae83f73479db0c9ff3b98d272ed89e600975e09038646975b084a2fefbc09bc88803cfdf480e31c1de689a93bb8fee8a402bf62ae7c8ee91314e4f2c514cd61deaad64d52dd26fbb8e3d151c1c14e3ca0e84b1d050663614c69808805a5b98cb9b8fda393ec84b124ea7358a0c4b3f9a742457cd19d4b6702c852f0180751afe5b3e8f0bbc9b24e7a8d6e0496ae18d8912b13fa1e54ae1f704a87f351657e0a5620c133e08ba8451043e7dcc52f7939bb1056e2ed8b79cae8e0342445371750384e5eb75e1fee3210f19cc56662d34271e9800d97ecc422e242bda15c7a3197ee657767806c68cf2ffc7f0a83391bdbffdd39223f9b30c6f3efa2a/175/1920x1080_5058864/index.m3u8"},
  {name:"&flix",type:"m3u8",logo:"https://i.imgur.com/JMeY5wP.jpeg",src:"https://edge3-moblive.yuppcdn.net/drm/smil:nflixdrm.smil/chunklist_b996000.m3u8"},
 {name:"Romanza+",type:"m3u8",logo:"https://i.imgur.com/FHOoDcg.jpeg",src:"https://livecdn.premiumfree.tv/afxpstr/Romanza/tracks-v2a1/mono.ts.m3u8"},
{name:"Oh My Ceria",type:"mpd",logo:"https://i.imgur.com/et1hSxY.jpeg",src:"https://b27a6dd8a86c3e4ba93fbae22aaaac64.pmqrop.channel-assembly.mediatailor.ap-southeast-1.amazonaws.com/v1/channel/FAST_7/dash.mpd"}, 
 {name:"Drama Hotpot",type:"mpd",logo:"https://i.imgur.com/WRot1kt.jpeg",src:"https://b27a6dd8a86c3e4ba93fbae22aaaac64.pmqrop.channel-assembly.mediatailor.ap-southeast-1.amazonaws.com/v1/channel/FAST_4/dash.mpd"},
 {name:"Drama Hebat",type:"mpd",logo:"https://i.imgur.com/tviORaN.jpeg",src:"https://b27a6dd8a86c3e4ba93fbae22aaaac64.pmqrop.channel-assembly.mediatailor.ap-southeast-1.amazonaws.com/v1/channel/FAST_1/dash.mpd"},
  {name:"Filem Mantap",type:"mpd",logo:"https://i.imgur.com/NUqFzXF.jpeg",src:"https://b27a6dd8a86c3e4ba93fbae22aaaac64.pmqrop.channel-assembly.mediatailor.ap-southeast-1.amazonaws.com/v1/channel/FAST_2/dash.mpd"},
 {name:"Rakuten Viki",type:"m3u8",logo:"https://i.imgur.com/sRKd4EM.png",src:"https://newidco-rakutenviki-2-eu.xiaomi.wurl.tv/4300.m3u8"}, 
{name:"Rakuten Tv1",type:"m3u8",logo:"https://i.imgur.com/Meew6eX.png",src:"https://0145451975a64b35866170fd2e8fa486.mediatailor.eu-west-1.amazonaws.com/v1/manifest/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5987/b300af92-32c5-4700-8e97-7ca32763f7c1/4.m3u8"},  
{name:"Rakuten Tv2",type:"m3u8",logo:"https://i.imgur.com/Meew6eX.png",src:"https://bca5a421a70c46ad911efd0a4767c4bf.mediatailor.eu-west-1.amazonaws.com/v1/manifest/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6075/0cf52fe4-0b62-4717-818f-caa4de32c0eb/4.m3u8"}, 
 {name:"Rakuten Tv3",type:"m3u8",logo:"https://i.imgur.com/Meew6eX.png",src:"https://54045f0c40fd442c8b06df076aaf1e85.mediatailor.eu-west-1.amazonaws.com/v1/manifest/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6065/426e174f-6cb8-4f95-8ac5-b847a1f331f5/4.m3u8"},  
 {name:"Asiancrush",type:"m3u8",logo:"https://i.imgur.com/fUg91vw.jpeg",src:"https://0fj.cc/acrush"},
 {name:"Mediacorp English",type:"m3u8",logo:"https://i.imgur.com/Qt1xyC8.jpeg",src:"https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/mediacorp-entertainment-english/85547489-2e92-414c-afe1-8c1ed45698a3/0.m3u8"}, 
 {name:"Mediacorp Chinese",type:"m3u8",logo:"https://i.imgur.com/Qt1xyC8.jpeg",src:"https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/mediacorp-entertainment-chinese/510cace9-8cc1-40a0-8ffa-31eaa2d3dae4/0.m3u8"},
 {name:"Mediacorp Tamil",type:"m3u8",logo:"https://i.imgur.com/Qt1xyC8.jpeg",src:"https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/mediacorp-entertainment-tamil/d67278a3-321b-4490-8fd6-805f1ffe43f9/0.m3u8"},
 {name:"Bravo",type:"m3u8",logo:"https://i.imgur.com/JmTIRLF.png",src:"https://fl7.moveonjoy.com/BRAVO/tracks-v1a1/mono.ts.m3u8"},
 {name:"Astro Awani",type:"m3u8",logo:"https://i.imgur.com/Z6oJ0cZ.jpeg",src:"https://d2idp3hzkhjpih.cloudfront.net/out/v1/4b85d9c2bf97413eb0c9fd875599b837/index_3.m3u8"},
 {name:"Very Local",type:"m3u8",logo:"https://i.imgur.com/F09sgaC.png",src:"https://stream-us-east-1.getpublica.com/cl/260121d5oerp0n829evd3p2up0/1280x720_3193687_0_f.m3u8?i=1_14"},
 {name:"Blast Movies",type:"m3u8",logo:"https://i.imgur.com/bVtMFhg.png",src:"https://amg19223-amg19223c7-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c7-amgplt0351/playlist.m3u8"},
 {name:"Hbo",type:"m3u8",logo:"https://i.imgur.com/gFz7eZB.jpeg",src:"https://fl1.moveonjoy.com/HBO/index.m3u8"},
 {name:"France 24",type:"m3u8",logo:"https://i.imgur.com/KH0RSwP.jpeg",src:"https://live.france24.com/hls/live/2037218-b/F24_EN_HI_HLS/master_5000.m3u8"},
{name:"Cna",type:"m3u8",logo:"https://i.imgur.com/hXqDlpF.jpeg",src:"https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_4.m3u8"}, 
 {name:"Bbc News",type:"m3u8",logo:"https://i.imgur.com/WVvPdlk.png",src:"https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news_channel_hd/t=3840/v=pv13/b=2812032/main.m3u8"}, 
{name:"Al jazeera",type:"m3u8",logo:"https://i.imgur.com/uiP9aHD.png",src:"https://d1cy85syyhvqz5.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/aljazeeraLive/AJE/index.m3u8"}, 
 {name:"Cnn",type:"mpd",logo:"https://i.imgur.com/Jifd8xj.png",src:"https://cachehsi1b.netplus.ch/tok_eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzY5MzE2MzAwIiwic2lwIjoiIiwicGF0aCI6Ii9saXZlL2Vkcy9jbm4vYnJvd3Nlci1kYXNoLyIsInNlc3Npb25fY2RuX2lkIjoiMDI5YjY2YjUxN2RmNmI1OSIsInNlc3Npb25faWQiOiIiLCJjbGllbnRfaWQiOiIiLCJkZXZpY2VfaWQiOiIiLCJtYXhfc2Vzc2lvbnMiOjAsInNlc3Npb25fZHVyYXRpb24iOjAsInVybCI6Imh0dHBzOi8vMTAuMC4yMjkuMTgiLCJzZXNzaW9uX3RpbWVvdXQiOjAsImF1ZCI6IjExIiwic291cmNlcyI6WzEwMF19.jz6EWR5ZELLV4NKqzn0PXM7rggIwwQcOxnrd5igj2i2oxHpeuzldALdocMh5nl1sjQ7YpW0ed7R1Z2wicjea6A==/live/eds/cnn/browser-dash/cnn.mpd"}, 
{name:"Dw",type:"m3u8",logo:"https://i.imgur.com/frpxwxF.png",src:"https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8"},
 {name:"Trt World",type:"m3u8",logo:"https://i.imgur.com/ArFYAL1.png",src:"https://tv-trtworld.medya.trt.com.tr/master_1080.m3u8"},
 {name:"Euro News",type:"m3u8",logo:"https://i.imgur.com/5UG3eNS.jpeg",src:"https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/euronews/c3f951bf-71cc-40b6-b806-1cf655cae2f2/5.m3u8"}, 
 {name:"Dubai One",type:"m3u8",logo:"https://i.imgur.com/bMzu8UH.jpeg",src:"https://dminnvllta.cdn.mgmlcdn.com/dubaione/smil:dubaione.stream.smil/chunklist_b1300000.m3u8"},
 {name:"Lotus Macau",type:"m3u8",logo:"https://i.imgur.com/cQyJqkd.jpeg",src:"https://cdn4.skygo.mn/live/disk1/Lotus/HLSv3-FTA/Lotus.m3u8"}, 
 {name:"Warner Tv",type:"m3u8",logo:"https://i.imgur.com/Q4NhDKm.png",src:"https://cdn4.skygo.mn/live/disk1/Warner/HLSv3-FTA/Warner-avc1_2089200=7-mp4a_256000_eng=6.m3u8"},
 {name:"Z One",type:"m3u8",logo:"https://i.imgur.com/dEMONnR.jpeg",src:"https://amg17931-zee-amg17931c6-samsung-au-8872.playouts.now.amagi.tv/ts-eu-w1-n2/playlist/amg17931-asiatvusaltdfast-zeeworld-samsungau/cb543d1c7f6c648e9cd43e6fd7ef41a2f9591fde1d6988693eb5518975d1073edce2a59caa08ff16388f1ede7f0a66413a3e951fda77118fd87eb141453c5728cfffe729a2c05616b7db083429b56a062a866a68ac39437ed0e21f48a238b6720a5aa82a66443d80b846ac7251db80148b61299bce8c37683f03409a5e5afba358b1ebe15e11d96fa7b44955c32910e29f43c8821ca6d2800acc5e8e70f7129594f8dad641d385f32993728aecdb5f581fa9a83bf8f955bfd6937929957f2d556c3a8cc1b2cd3ef702da21269cded8b664857fa64dab861251960196468831c81cc2f64f4a2dd2cfeb8f382d14a1d0496e678de4ae83f73479db0c9ff3b98d272ed89e600975e09038646975b084a2fefbc09bc88803cfdf480e31c1de689a93bb8fee8a402bf62ae7c8ee91314e4f2c514cd61deaad64d52dd26fbb8e3d151c1c14e3ca0e84b1d050663614c69808805a5b98cb9b8fda393ec84b124ea7358a0c4b3f9a742457cd19d4b6702c852f0180751afe5b3e8f0bbc9b24e7a8d6e0496ae18d8912b13fa1e54ae1f704a87f351657e0a5620c133e08ba8451043e7dcc52f7939bb1056e2ed8b79cae8e0342445371750384e5eb75e1fee3210f19cc56662d34271e9800d97ecc422e242bda15c7a3197ee657757406c6f7c4f9c7f036107edaaf19afd29649ad4ed9cfdef5/149/640x360_1222701/index.m3u8"},
 {name:"Fx Movie",type:"m3u8",logo:"https://i.imgur.com/DALxKKD.jpeg",src:"https://fl61.moveonjoy.com/FX_MOVIE/tracks-v1a1/mono.ts.m3u8"}, 
 {name:"Fxx",type:"m3u8",logo:"https://i.imgur.com/zys4htx.png",src:"https://fl61.moveonjoy.com/FXX/tracks-v1a1/mono.ts.m3u8"}, 
{name:"Film4",type:"m3u8",logo:"https://i.imgur.com/MTSgoGI.png",src:"https://cache1a.netplus.ch/tok_eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzY3NzEyNzk3Iiwic2lwIjoiIiwicGF0aCI6Ii9saXZlL2Vkcy9maWxtNC9icm93c2VyLUhMUzgvIiwic2Vzc2lvbl9jZG5faWQiOiI3ZGVjNGU2NmJiMWU5ZTQ1Iiwic2Vzc2lvbl9pZCI6IiIsImNsaWVudF9pZCI6IiIsImRldmljZV9pZCI6IiIsIm1heF9zZXNzaW9ucyI6MCwic2Vzc2lvbl9kdXJhdGlvbiI6MCwidXJsIjoiaHR0cHM6Ly8xMC4wLjIyOS4xOCIsInNlc3Npb25fdGltZW91dCI6MCwiYXVkIjoiNTMiLCJzb3VyY2VzIjpbMTAwXX0=.svq-Iz0ekE_nRf9jefXiIUYEkViGPvKnauFNH36gcuiOa_WrcN8xeEQQ7Iup0v_-jxg78ek3AWmAr-8OiZFIDA==/live/eds/film4/browser-HLS8/film4-avc1_2600000=3.m3u8"}, 
{name:"Jungo Pinoy",type:"m3u8",logo:"https://i.imgur.com/W3gHsJ9.png",src:"https://jungotvstream.chanall.tv/jungotv/jungopinoytv/stream.m3u8"}, 
{name:"KidsFlix",type:"m3u8",logo:"https://i.imgur.com/4Pn0ADQ.png",src:"https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50"},  
{name:"Red Box Movies",type:"m3u8",logo:"https://i.imgur.com/OrGCnPg.jpg",src:"https://7732c5436342497882363a8cd14ceff4.mediatailor.us-east-1.amazonaws.com/v1/master/04fd913bb278d8775298c26fdca9d9841f37601f/Plex_NewMovies/playlist.m3u8"},  
 {name:"Free Movies",type:"m3u8",logo:"https://i.imgur.com/I13yHUH.png",src:"https://amg01553-amg01553c2-samsung-ph-7163.playouts.now.amagi.tv/playlist.m3u8"}, 
 {name:"Amc+",type:"m3u8",logo:"https://i.imgur.com/cKyj2ef.png",src:"https://bcovlive-a.akamaihd.net/ba853de442c140b7b3dc020001597c0a/us-east-1/6245817279001/profile_0/chunklist.m3u8"},
{name:"Cw Gold",type:"m3u8",logo:"https://i.imgur.com/92Uid6m.jpeg",src:"https://d1d726ny1vain2.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-femoe55fvrdvc/playlist.m3u8"}, 
  {name:"Cw Forever",type:"m3u8",logo:"https://i.imgur.com/oSlmQb6.jpeg",src:"https://d1sknsnbkyvie.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-sbcl5hxexbihh/playlist.m3u8"},
 {name:"Crave1",type:"m3u8",logo:"https://i.imgur.com/ZkRQ0r1.png",src:"https://fl7.moveonjoy.com/CRAVE_1/tracks-v1a1/mono.ts.m3u8"},
 {name:"Crave2",type:"m3u8",logo:"https://i.imgur.com/e1qJ5Bp.png",src:"https://fl61.moveonjoy.com/CRAVE_2/tracks-v1a1/mono.ts.m3u8"},
 {name:"Crave3",type:"m3u8",logo:"https://i.imgur.com/kOi0Adn.png",src:"https://fl7.moveonjoy.com/CRAVE_3/tracks-v1a1/mono.ts.m3u8"},
 {name:"Crave4",type:"m3u8",logo:"https://i.imgur.com/MyH3Q2p.png",src:"https://fl61.moveonjoy.com/CRAVE_4/tracks-v1a1/mono.ts.m3u8"},
 {name:"Disney Xd",type:"m3u8",logo:"https://i.imgur.com/Po1NF11.jpeg",src:"https://fl1.moveonjoy.com/DISNEY_XD/index.m3u8"},
{name:"Paramount Network",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Paramount_Network.svg/512px-Paramount_Network.svg.png",src:"https://fl31.moveonjoy.com/PARAMOUNT_NETWORK/tracks-v1a1/mono.ts.m3u8"}, 
 {name:"Mgm+",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/MGM%2B_logo.svg/512px-MGM%2B_logo.svg.png",src:"https://fl31.moveonjoy.com/EPIX/tracks-v1a1/mono.ts.m3u8"},
 {name:"Mgm Marquee+",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/MGM%2B_Marquee_2023.svg/512px-MGM%2B_Marquee_2023.svg.png",src:"https://fl31.moveonjoy.com/EPIX_DRIVE_IN/tracks-v1a1/mono.ts.m3u8"},
 {name:"Persiana+",type:"m3u8",logo:"https://i.imgur.com/0xttibX.png",src:"https://euhls.persiana.live/hls/stream.m3u8"},
 {name:"Hallmark Mysteries",type:"m3u8",logo:"https://i.imgur.com/GPRGA9C.png",src:"https://fl61.moveonjoy.com/HALLMARK_MOVIES_MYSTERIES/tracks-v1a1/mono.ts.m3u8"},
{name:"Comic U",type:"m3u8",logo:"https://i.imgur.com/ziTlvlL.jpeg",src:"https://amg19223-amg19223c8-amgplt0351.playout.now3.amagi.tv/playlist/amg19223-amg19223c8-amgplt0351/playlist.m3u8"}, 
{name:"Sine Manila",type:"m3u8",logo:"https://i.imgur.com/zcFUYC5.png",src:"https://live20.bozztv.com/giatv/giatv-sinemanila/sinemanila/chunks.m3u8"}, 
 {name:"Rage Tv",type:"m3u8",logo:"https://i.imgur.com/E3q2kTu.png",src:"https://live20.bozztv.com/giatv/giatv-ragetv/ragetv/chunks.m3u8"},
 {name:"Fx Media",type:"m3u8",logo:"https://i.imgur.com/bJgq1t9.png",src:"https://protokolldns.xyz/fxmediaweb5548/tracks-v1a1/mono.m3u8"},
 {name:"Hi Dost!",type:"m3u8",logo:"https://i.imgur.com/BDhwsLy.png",src:"https://cdn-1.pishow.tv/live/224/master.m3u8"},
 {name:"Dove Channel",type:"m3u8",logo:"https://i.ibb.co/t3dXphQ/download-2024-06-27-T073317-555.png",src:"https://linear-896.frequency.stream/dist/xumo/896/hls/master/playlist_1280x720.m3u8"},  
{name:"Charge",type:"m3u8",logo:"https://i.imgur.com/1rxmu2u.png",src:"https://fast-channels.sinclairstoryline.com/CHARGE/index_1.m3u8"}, 
{name:"E!",type:"m3u8",logo:"https://i.imgur.com/A5TaXyX.png",src:"https://fl61.moveonjoy.com/E_ENTERTAINMENT_TELEVISION/tracks-v1a1/mono.ts.m3u8"},  
{name:"The Hotel Inspector",type:"m3u8",logo:"https://i.imgur.com/nRackT1.jpeg",src:"https://amg00654-itv-amg00654c4-rakuten-uk-5263.playouts.now.amagi.tv/1080p/index.m3u8"},
{name:"3Abn",type:"m3u8",logo:"https://i.imgur.com/4P7pZpG.png",src:"https://3abn.bozztv.com/3abn2/3abn_live/smil:3abn_live.smil/chunklist_w607687871_b1628000_slen.m3u8?nimblesessionid=521306088"}, 
 {name:"3Abn Kids",type:"m3u8",logo:"https://i.imgur.com/zYKdbt8.jpeg",src:"https://3abn.bozztv.com/3abn2/Kids_live/smil:Kids_live.smil/chunklist_w697861945_b1928000_slen.m3u8?nimblesessionid=521306749"}, 
 {name:"Miramax",type:"m3u8",logo:"https://i.imgur.com/PfCbb8O.png",src:"https://linear-798.frequency.stream/mt/plex/798/hls/master/playlist_1920x1080.m3u8"},
 {name:"Lusnjah Tv",type:"m3u8",logo:"https://i.imgur.com/5A5CFK6.png",src:"https://0fj.cc/lushtv"}, 
{name:"Amc",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/AMC_logo_2019.svg/512px-AMC_logo_2019.svg.png",src:"https://fl61.moveonjoy.com/AMC_NETWORK/tracks-v1a1/mono.ts.m3u8"},
 {name:"Sundance",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/SundanceTV_2014.svg/512px-SundanceTV_2014.svg.png",src:"https://fl61.moveonjoy.com/SUNDANCE/tracks-v1a1/mono.ts.m3u8"},  
 {name:"The Manila Times",type:"m3u8",logo:"https://i.imgur.com/nKdSuTF.png",src:"https://customer-ksrwu2hvu2ipx2fb.cloudflarestream.com/121fd4c01c7ed1c0b1d2c6699e52309a/manifest/video.m3u8?parentOrigin=https%3A%2F%2Fwww.manilatimes.net"},  
{name:"Ktv2",type:"m3u8",logo:"https://i.imgur.com/p5E7Rv2.jpeg",src:"https://kwtktv2ta.cdn.mangomolo.com/ktv2/smil:ktv2.stream.smil/chunklist_b1500000_t64NzIwcA==.m3u8"}, 
{name:"Mhz",type:"m3u8",logo:"https://i.imgur.com/w21rG0z.png",src:"https://mhz-samsung-linear-ca.samsung.wurl.tv/playlist.m3u8"},
{name:"Lifetime Movies",type:"m3u8",logo:"https://i.postimg.cc/RZGmYyTt/lifetimemovies.png",src:"https://fl61.moveonjoy.com/LIFETIME_MOVIE_NETWORK/tracks-v1a1/mono.ts.m3u8"}, 
{name:"Universal Movies",type:"m3u8",logo:"https://i.imgur.com/0rq9qX4.png",src:"https://d4whmvwm0rdvi.cloudfront.net/10007/99991621/hls/master.m3u8?ads.xumo_channelId=99991621&ads.asnw=169843&ads.afid=158702674&ads.sfid=16926435&ads.csid=xumo_desktopweb_rottentomatoesrttv_ssaicro&ads._fw_is_lat=0&ads._fw_us_privacy=1YNN&ads._fw_coppa=0&ads._fw_did=413d7e29-b63e-b34e-b143-bf0efe32f394&ads._fw_vcid2=512116:413d7e29-b63e-b34e-b143-bf0efe32f394&ads._fw_app_bundle=&ads._fw_app_store_url=&ads._fw_content_category=IAB1-5&ads._fw_content_genre=Movies&ads._fw_content_language=en&ads._fw_content_rating=TV-PG&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_deviceType=2-Personal_Computer&ads.appVersion=2.18.0&ads.appName=xumo&ads.xumo_contentId=2659&ads.xumo_contentName=RottenTomatoesRTTV&ads.xumo_providerId=2659&ads.xumo_providerName=RottenTomatoesRTTV&ads.channelId=99991621&ads._fw_ifa_type=dpid&ads.site_name=XumoPlay&ads.site_page=https%253A%252F%252Fplay.xumo.com"}, 
{name:"Kocowa",type:"m3u8",logo:"https://i.imgur.com/0u1M2wS.jpeg",src:"https://dbrb49pjoymg4.cloudfront.net/10001/99991348/hls/master.m3u8?includeAssetTags=true&ads.xumo_channelId=99991348&ads._fw_ifa_type=dpid&ads._fw_did=413d7e29-b63e-b34e-b143-bf0efe32f394&ads.amznappId=[AMZN_APP_ID]&ads.lat=[LAT]&ads.lon=[LON]&ads.os=[OS]&ads.osv=[OS_VERSION]&ads.asnw=&ads.caid=Kocowa&ads.csid=xumo_desktopweb_Kocowa_ssai&ads._fw_is_lat=0&ads._fw_us_privacy=1YNN&ads._fw_coppa=0&ads.genre=Action%2CAdventure%2CComedy%2CCrime%2CDrama%2CFamily%2CFantasy%2CHorror%2CMystery%2CRomance%2CSci-Fi%2CThriller%2CWar%2CWestern%2CSuperhero&ads._fw_content_category=IAB1-7&ads._fw_content_language=undefined&ads._fw_content_genre=International&ads._fw_content_rating=TV-14&ads.xumo_contentId=285&ads.xumo_contentName=Kocowa&ads.xumo_providerId=285&ads.xumo_providerName=Kocowa&ads._fw_deviceMake=&ads._fw_device_model=&ads.channelId=99991348&ads.xumo_platform=desktopweb&ads.site_id=26840&ads.appName=xumo&ads.appVersion=2.18.0&ads._fw_app_bundle=&ads._fw_app_store_url=&ads.site_name=XumoPlay&ads.site_page=https%253A%252F%252Fplay.xumo.com"}, 
{name:"New Korean Movies",type:"m3u8",logo:"https://i.imgur.com/NuGi9x1.jpeg",src:"https://dbrb49pjoymg4.cloudfront.net/10001/99991386/hls/master.m3u8?includeAssetTags=true&ads.xumo_channelId=99991386&ads._fw_ifa_type=dpid&ads._fw_did=413d7e29-b63e-b34e-b143-bf0efe32f394&ads.amznappId=[AMZN_APP_ID]&ads.lat=[LAT]&ads.lon=[LON]&ads.os=[OS]&ads.osv=[OS_VERSION]&ads.asnw=&ads.caid=NewKoreanMoviesandSeries&ads.csid=xumo_desktopweb_NewKoreanMoviesandSeries_ssai&ads._fw_is_lat=0&ads._fw_us_privacy=1YNN&ads._fw_coppa=0&ads.genre=Action%2CAdventure%2CComedy%2CCrime%2CDrama%2CFamily%2CFantasy%2CHorror%2CMystery%2CRomance%2CSci-Fi%2CThriller%2CWar%2CWestern%2CSuperhero&ads._fw_content_category=IAB1-7&ads._fw_content_language=undefined&ads._fw_content_genre=International&ads._fw_content_rating=TV-14&ads.xumo_contentId=1825&ads.xumo_contentName=NEWK.ID&ads.xumo_providerId=1825&ads.xumo_providerName=NEWK.ID&ads._fw_deviceMake=&ads._fw_device_model=&ads.channelId=99991386&ads.xumo_platform=desktopweb&ads.site_id=26840&ads.appName=xumo&ads.appVersion=2.18.0&ads._fw_app_bundle=&ads._fw_app_store_url=&ads.site_name=XumoPlay&ads.site_page=https%253A%252F%252Fplay.xumo.com"}, 
 {name:"Bollywood Hd",type:"m3u8",logo:"https://i.imgur.com/scDKOLS.png",src:"https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bollywood-hd/manifest.m3u8"},
 {name:"Bollywood Classic",type:"m3u8",logo:"https://i.imgur.com/ugPo6ca.png",src:"https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bollywood-classic/manifest.m3u8"},
 {name:"Gusto Tv",type:"m3u8",logo:"https://i.imgur.com/GHVO6Gb.jpeg",src:"https://amg01077-gusto-gustous-firetv.amagi.tv/360p-cc/index.m3u8"},
 {name:"Jubao",type:"m3u8",logo:"https://i.imgur.com/axgnyFr.png",src:"https://dbrb49pjoymg4.cloudfront.net/10001/99991779/hls/master.m3u8?includeAssetTags=true&ads.xumo_channelId=99991779&ads._fw_ifa_type=dpid&ads._fw_did=413d7e29-b63e-b34e-b143-bf0efe32f394&ads.amznappId=[AMZN_APP_ID]&ads.lat=[LAT]&ads.lon=[LON]&ads.os=[OS]&ads.osv=[OS_VERSION]&ads.asnw=&ads.caid=NBCUJubao&ads.csid=xumo_desktopweb_NBCUJubao_ssai&ads._fw_is_lat=0&ads._fw_us_privacy=1YNN&ads._fw_coppa=0&ads.genre=Action%2CAdventure%2CComedy%2CCrime%2CDrama%2CFamily%2CFantasy%2CHorror%2CMystery%2CRomance%2CSci-Fi%2CThriller%2CWar%2CWestern%2CSuperhero&ads._fw_content_category=IAB1-7&ads._fw_content_language=undefined&ads._fw_content_genre=International&ads._fw_content_rating=TV-PG&ads.xumo_contentId=2643&ads.xumo_contentName=NBCUJubao&ads.xumo_providerId=2643&ads.xumo_providerName=NBCUJubao&ads._fw_deviceMake=&ads._fw_device_model=&ads.channelId=99991779&ads.xumo_platform=desktopweb&ads.site_id=26840&ads.appName=xumo&ads.appVersion=2.18.0&ads._fw_app_bundle=&ads._fw_app_store_url=&ads.site_name=XumoPlay&ads.site_page=https%253A%252F%252Fplay.xumo.com"},
 {name:"RomKom K Drama",type:"m3u8",logo:"https://i.imgur.com/613fcGi.jpeg",src:"https://4df655f2.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctY2FfUm9tQ29tS0RyYW1hX0hMUw/playlist.m3u8"},
 {name:"Ani One",type:"m3u8",logo:"https://www.medialink.com.hk/img/ani-one-logo.jpg",src:"https://amg19223-amg19223c9-amgplt0019.playout.now3.amagi.tv/playlist/amg19223-amg19223c9-amgplt0019/playlist.m3u8"},
{name:"Aniplus",type:"m3u8",logo:"https://i.imgur.com/TXTluER.png",src:"https://amg18481-amg18481c1-amgplt0352.playout.now3.amagi.tv/playlist/amg18481-amg18481c1-amgplt0352/playlist.m3u8"},
 {name:"Kidoodle TV",type:"m3u8",logo:"https://d1iiooxwdowqwr.cloudfront.net/pub/appsubmissions/20201230211817_FullLogoColor4x.png",src:"https://amg07653-apmc-amg07653c5-samsung-ph-8539.playouts.now.amagi.tv/playlist.m3u8"},
 {name:"AnimeX",type:"m3u8",logo:"https://logomakerr.ai/uploads/output/2023/08/01/8d87f4803925f46fcdb6b9ae8a1e6244.jpg",src:"https://live20.bozztv.com/giatv/giatv-animex/animex/chunks.m3u8"},
  {name:"Stingray Karaoke",type:"m3u8",logo:"https://i.imgur.com/SOQLD0a.jpeg",src:"https://lotus.stingray.com/manifest/karaoke-kar000-montreal/samsungtvplus/master.m3u8"},
 {name:"Red Bull",type:"m3u8",logo:"https://i.imgur.com/Ju6FJNA.png",src:"https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8"},
 {name:"Fork & Flight",type:"m3u8",logo:"https://i.imgur.com/N892UNK.png",src:"https://amg00346-vizioono-forkandfligt-xumo-us.amagi.tv/1080p/index.m3u8"},
 {name:"Bbc Impossible",type:"m3u8",logo:"https://i.imgur.com/IlIPwWV.png",src:"https://bbc-impossible-1-us.xumo.wurl.tv/4300.m3u8"},
 {name:"Movies for Gamers",type:"m3u8",logo:"https://i.imgur.com/aqjzEkb.png",src:"https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/6008ddf24ef92b00079d61cf/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=6c2a02e3-30d3-11ef-9cf5-e9ddff8ff496&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=2f37e9d8-bdac-4d46-949d-ccfbf76dd6e0"}, 
 {name:"Galaxy Gr",type:"m3u8",logo:"https://i.imgur.com/n9OQkz0.png",src:"https://live20.bozztv.com/akamaissh101/ssh101/galaxygr/chunks.m3u8"},
 {name:"Reuters",type:"m3u8",logo:"https://i.ibb.co/DCntyzt/reuterstv.png",src:"https://amg00453-reuters-amg00453c1-samsung-de-2111.playouts.now.amagi.tv/playlist/amg00453-reuters-reuters-samsungde/playlist.m3u8"},
 {name:"Rt",type:"m3u8",logo:"https://i.imgur.com/QKkQtFg.png",src:"https://rt-glb.rttv.com/dvr/rtnews/playlist_4500Kb.m3u8"},
 {name:"Dw News",type:"m3u8",logo:"https://i.imgur.com/nTmk6z3.png",src:"https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8"},
 {name:"Tutv",type:"m3u8",logo:"https://i.imgur.com/AUQyDEM.jpeg",src:"https://livestream.telvue.com/templeuni1/f7b44cfafd5c52223d5498196c8a2e7b.sdp/templeuni1/stream1/chunks.m3u8"},
 {name:"Wion",type:"m3u8",logo:"https://i.imgur.com/1l1FdVb.jpeg",src:"https://d7x8z4yuq42qn.cloudfront.net/index_7.m3u8"},
  {name:"Ifilm",type:"m3u8",logo:"https://upload.wikimedia.org/wikipedia/commons/b/b9/IFILM.png",src:"https://live.presstv.ir/hls/ifilmen_4_482/index.m3u8"},
 {name:"Mix",type:"m3u8",logo:"https://i.imgur.com/1ENdbZn.png",src:"https://ml-pull-hwc.myco.io/MixTV/hls/index.m3u8"},
 {name:"Home+",type:"m3u8",logo:"https://www.lyngsat.com/logo/tv/hh/homeplus.png",src:"https://homeplushls.wns.live/hls/stream.m3u8"},
 {name:"Icc+",type:"m3u8",logo:"https://www.lyngsat.com/logo/tv/ii/iccplus-us.png",src:"https://icchls.wns.live/hls/stream.m3u8"},
  {name:"Grand Cinema",type:"m3u8",logo:"https://www.lyngsat.com/logo/tv/gg/grand-cinema.png",src:"https://gcinemahls.wns.live/hls/stream.m3u8"},
 {name:"Cinevault",type:"m3u8",logo:"https://i.imgur.com/xaCyyDd.png",src:"https://gsn-cinevault-80s-2-us.roku.wurl.tv/2000.m3u8"},
 {name:"Next Hd",type:"m3u8",logo:"https://i.imgur.com/c2rF3SS.png",src:"https://live.enhdtv.com:19360/nexthd/nexthd.m3u8"},
 {name:"One Crime & Justice",type:"m3u8",logo:"https://i.imgur.com/FX8X5uE.png",src:"https://aegis-cloudfront-1.tubi.video/66353608-b293-407b-9e79-d69ba8b17594/playlist_1280x720.m3u8"},
 {name:"Superyacht Tv",type:"m3u8",logo:"https://i.imgur.com/bH6BaSq.png",src:"https://sy.wns.live/hls/stream.m3u8"},
 {name:"Sony Cine",type:"m3u8",logo:"https://i.imgur.com/bZWoDTg.png",src:"https://a-cdn.klowdtv.com/live1/cine_720p/playlist.m3u8"},
 {name:"Kino Asia",type:"m3u8",logo:"https://i.imgur.com/gaket4B.png",src:"https://cityeden.catcast.tv/content/34393/index.m3u8"},
 {name:"Kino Drama",type:"m3u8",logo:"https://i.imgur.com/29ddffh.png",src:"https://cityeden.catcast.tv/content/45269/index.m3u8"},
 {name:"Movie Detective",type:"m3u8",logo:"https://i.imgur.com/9rKHwBV.png",src:"https://cityeden.catcast.tv/content/41327/index.m3u8"},
 {name:"Hrb",type:"m3u8",logo:"https://www.tvchinese.net/uploads/tv/haerbin.jpg",src:"https://stream.hrbtv.net/yspd/sd/live.m3u8"},
  {name:"Me Tv",type:"m3u8",logo:"https://i.imgur.com/4xivX4u.jpeg",src:"https://fl61.moveonjoy.com/ME_TV/tracks-v1a1/mono.ts.m3u8"},
 {name:"Grit",type:"m3u8",logo:"https://i.imgur.com/j3A1Q8X.png",src:"https://fl31.moveonjoy.com/GRIT_TV/tracks-v1a1/mono.ts.m3u8"},
 {name:"Artflix",type:"m3u8",logo:"https://i.imgur.com/5pOZQB4.png",src:"https://amogonetworx-artflix-1-nl.samsung.wurl.tv/playlist.m3u8"},
 {name:"Grjngo",type:"m3u8",logo:"https://i.imgur.com/wFqhK3p.png",src:"https://amogonetworx-grjngo-3-dk.samsung.wurl.tv/3000.m3u8"},
 {name:"Classic Cinema",type:"m3u8",logo:"https://i.imgur.com/FJoPnTb.png",src:"https://rpn.bozztv.com/gusa/gusa-classiccinema/index.m3u8"}
 



];

let hideTimer;

function showUI(){
  slides.classList.remove("hide");
  clearTimeout(hideTimer);
  hideTimer=setTimeout(()=>{ slides.classList.add("hide"); },3000);
}
["mousemove","touchstart","click","keydown"].forEach(e=>document.addEventListener(e,showUI,{passive:true}));

function buildSlides(){
  slides.innerHTML="";
  channels.forEach((ch,i)=>{
    const d=document.createElement("div");
    d.className="top-watch-item";
    d.innerHTML=`
      <img src="${ch.logo}" class="top-watch-logo">
      <div class="top-label">${ch.name}</div>
      <div class="live-indicator">LIVE</div>`;
    d.onclick=()=>loadChannel(i);
    slides.appendChild(d);
  });
}

function setActive(){
  [...slides.children].forEach((el,i)=>{ el.classList.toggle("active",i===currentIndex); });
  slides.children[currentIndex]?.scrollIntoView({behavior:"smooth",inline:"center"});
}

async function resetPlayer(){
  if(hls){hls.destroy();hls=null;}
  if(shakaPlayer){await shakaPlayer.destroy();shakaPlayer=null;}
  player.pause();player.removeAttribute("src");player.load();
  player.style.display="none";
  frame.style.display="none";
  bigPlay.style.display="none";
}

async function loadChannel(i){
  showUI();
  currentIndex=i;
  setActive();
  localStorage.setItem("lastIndex",i);
  const ch=channels[i];
  await resetPlayer();

  if(ch.type==="website"){
    window.open(ch.src,"_blank");
    return;
  }

  player.style.display="block";

  if(ch.type==="mp4"){
    player.src=ch.src;
    player.play().catch(()=>bigPlay.style.display="flex");
    return;
  }

  if(ch.type==="m3u8"){
    if(player.canPlayType("application/vnd.apple.mpegurl")){
      player.src=ch.src;
    }else{
      hls=new Hls();
      hls.loadSource(ch.src);
      hls.attachMedia(player);
    }
    player.play().catch(()=>bigPlay.style.display="flex");
    return;
  }

  if(ch.type==="mpd"){
    shaka.polyfill.installAll();
    shakaPlayer=new shaka.Player(player);
    if(ch.drm){
      shakaPlayer.configure({drm:{clearKeys:{[ch.keyId]:ch.key}}});
    }
    await shakaPlayer.load(ch.src);
    await player.play();
  }
}

bigPlay.onclick=()=>{player.play();bigPlay.style.display="none"};

function toggleFS(){
  document.fullscreenElement ? document.exitFullscreen() : document.getElementById("tapZone").requestFullscreen();
}

let lastTap=0;
tapOverlay.addEventListener("touchend",()=>{
  const t=Date.now();
  if(t-lastTap<300)toggleFS();
  lastTap=t;
});
tapOverlay.addEventListener("dblclick",toggleFS);

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight")loadChannel((currentIndex+1)%channels.length);
  if(e.key==="ArrowLeft")loadChannel((currentIndex-1+channels.length)%channels.length);
  if(e.key==="Enter")player.paused?player.play():player.pause();
  if(e.key==="Backspace"||e.key==="Escape"){ if(document.fullscreenElement)document.exitFullscreen(); }
});

window.onload=()=>{
  buildSlides();
  const last=localStorage.getItem("lastIndex");
  loadChannel(last?+last:0);
};

// Anti-devtools
(function(){
  let open=false,limit=160;
  setInterval(()=>{
    const d=(window.outerWidth-window.innerWidth>limit)||(window.outerHeight-window.innerHeight>limit);
    if(d&&!open){
      open=true;
      try{player.pause()}catch(e){}
      document.body.style.filter="blur(6px)";
      document.body.style.pointerEvents="none";
    }
    if(!d&&open){
      open=false;
      document.body.style.filter="";
      document.body.style.pointerEvents="";
      try{player.play()}catch(e){}
    }
  },800);

  document.addEventListener("keydown",e=>{
    if(e.key==="F12"||(e.ctrlKey&&e.shiftKey&&["I","J","C"].includes(e.key))||(e.ctrlKey&&e.key==="U")){
      e.preventDefault();return false;
    }
  });
})();
