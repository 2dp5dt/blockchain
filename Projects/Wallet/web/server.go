package main

import (
	"net/http"
)

func urlHome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/html/index.html")
}

func urlWalletHome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/html/walletHome.html")
}

func main() {
	http.HandleFunc("/", urlHome)
	http.HandleFunc("/walletHome", urlWalletHome)

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.ListenAndServe(":8080", nil)
}
