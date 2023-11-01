import Post from "./Post"
import './styles/styles.css'
import img from "@Assets/logo.png"
import xml from "@Assets/data.xml"
import csv from "@Assets/data.csv"

const post = new Post("Kiryl Shauchenka", img)

console.log("Post to string: ", post.toString())
console.log(xml)
console.log(csv)