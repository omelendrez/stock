# Stock
## Sistema de stock


1) Abrir vscode y cambiar a la branch develop:

```git checkout develop```

2) Bajar los últimos cambios de esa branch:

```git pull```

3) Crear una branch nueva para el issue con el que hay que trabajar.
Por ejemplo si el issue es el numero 15, hacer:

```git checkout -b feature_XX```

(donde XX es el número de issue, por ejemplo feature_15 para este ejemplo)

4) Una vez terminado el código y luego de probarlo y que ande bien, hacer:

```git status```

5) Se habrán listado en color rojo los archivos que hemos modificado, entonces hacer:

```git add .```

6) Con eso hemos agregado los archivos para ser "pusheados" al repo de github.
Ahora verificamos que los archivos fueron agregados (deberán estar en color verde)

```git status```

7) Ahora vamos a "commitear" esos cambios con el siguiente comando:

```git commit -m "Descripcion de lo que hemos hecho"```

8) Ya podemos subir los cambios al repo con:

```git push origin feature_XX```

(donde XX es el número de issue por ejemplo feature_15 para este ejemplo)

9) Ir a la página de github y crear el PR y ponerme a mí como reviewer.
