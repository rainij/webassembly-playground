# Consumer C++ Project

This is a simple consumer project demonstrating how to use the `dummy` library in an "ordinary" C++ project.

To build this project do the following

```shell
$ mkdir build && cd build
$ cmake ..
$ make
```

Note that for this to work the `dummy` library has to be locateable by cmake somehow (see the README of `dummy`).

Now you can run the executable:

```shell
$ ./consumer
```
