(module
  ;; Import logging functionality from *embedder* (e.g. browser,
  ;; node or a dedicated wasm runtime like wasmtime):
  (import "env" "log" (func $log (param i32 i32)))
  ;; Define a function which calculates 1*2*...*(n-1)*n:
  (func $factorial_logger (param $n i32) (result i32)
    ;; Declare local variables
    (local $i i32) ;; Note: implicitly initialized to 0
    (local $result i32)
    ;; set result = 1
    i32.const 1
    local.set $result
    ;; loop-block with *label* 'continue'
    (loop $continue
      ;; (normal) block with *label* 'break'
      (block $break
        ;; ++i
        local.get $i
        i32.const 1
        i32.add
        local.set $i
        ;; result = i * result
        local.get $i
        local.get $result
        i32.mul
        local.set $result
        ;; log current result
        local.get $i
        local.get $result
        call $log
        ;; break if i >= n, continue loop otherwise.
        ;; Note: there are two instructions implementing '>='
        ;; - an instruction interpreting i32 as *unsigned* integer: 'ge_u'
        ;; - an instruction interpreting i32 as *signed* integer: 'ge_s'
        ;; For our use case the difference is not important, but ge_u
        ;; is more natural here.
        ;; Of course i32.eq would work here too.
        local.get $i
        local.get $n
        i32.ge_u
        br_if $break ;; jump to end of the normal block if i >= n.
        br $continue ;; jump back to the beginning of the loop-block
      )
    )
    ;; Finally: put the result on the stack to implicitly return it.
    local.get $result
  )
  ;; export the above function:
  (export "factorial_logger" (func $factorial_logger))
)
