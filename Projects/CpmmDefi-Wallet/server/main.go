package main

import (
	"net/http"
)

func dashboard(res http.ResponseWriter, req *http.Request) {

}
func swap(http.ResponseWriter, *http.Request) {

}
func staking(http.ResponseWriter, *http.Request) {

}
func opentoken(http.ResponseWriter, *http.Request) {

}
func connectwallet(http.ResponseWriter, *http.Request) {

}
func main() {
	port := ":3000"

	http.HandleFunc("/", dashboard)
	http.HandleFunc("/swap", swap)
	http.HandleFunc("/staking", staking)
	http.HandleFunc("/opentoken", opentoken)
	http.HandleFunc("/connectwallet", connectwallet)

	http.ListenAndServe(port, http.FileServer(http.Dir("./html")))

}
