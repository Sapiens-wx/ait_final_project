# npm run build
#cd src/client
#npm run build
# insert code into src/app.mjs
INSERT_CODE='app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});
'
sed -i "/\/\/\#build/a\\$INSERT_CODE" src/app.mjs
