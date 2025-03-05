# Tailwind-Transpiler
Tiny transpiler to collect and put all custom tailwind classes into a file.

<p>Use:

```
npm i tailwind-transpiler
```

to install the library </p>

<p>
And then use it in your project scripts like this:
</p>

```
"script":{
    "extract": "extract-classes"
}
```

<p>Then run the script using:
</p>

```
npm run extract
```

<p>Also, by default, it will process the
 
`src`

 folder, but you can specify a different folder like this:
</p>

```
"script":{
    "extract": "extract-classes folder-you-want"
}
```
