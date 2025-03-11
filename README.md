# Tailwind-Transpiler
Tiny transpiler to collect and put all custom tailwind classes into a file.

<p>Use:

```
npm i tailwind-transpiler -D
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

<p>Also, by default, it will process the<strong> src</strong> folder, but you can specify a different folder like this:
</p>

```
"script":{
    "extract": "extract-classes folder-you-want"
}
```

<p>
It will generate custom classnames in output folder in the root directory and in <strong>extracted-classes.json</strong> file.
</p>

<p>
Also you can see project in my github repositories:


</p>
 <a style="margin-top: 10px;" target="_blank" href="https://github.com/Mobinafshari">
		<img src="https://img.icons8.com/doodle/40/000000/github--v1.png"></a>
	  <a href="mailto:afshari.mobin00@gmail.com" target="_blank" style="margin-left: 10px;">
