# npm run build
cd src/client
npm run build
cd ../..
# insert code into src/app.mjs
INSERT_CODE=$(cat <<'EOF'
app.use(express.static(path.join(__dirname, "client/dist")));
EOF
)

awk -v insert="$INSERT_CODE" '
BEGIN { found=0 }
{
    if ($0 ~ /\/\/#build/) {
        found++
        print
        if (found == 1) {
            print insert
            skip=1
            next
        } else {
            skip=0
            next
        }
    }

    if (skip) next

    print
}
' src/app.mjs > tmp && mv tmp src/app.mjs
