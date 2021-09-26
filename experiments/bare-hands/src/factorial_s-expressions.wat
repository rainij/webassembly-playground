;; Equivalent to factorial.wat, but using S-expressions for readability
(module
  (import "env" "log" (func $log (param i32 i32)))
  (func $factorial_logger (param $n i32) (result i32)
    (local $i i32) ;; implicitly initialized to 0
    (local $result i32)
    (local.set $result
      (i32.const 1))
    (loop $continue
      (block $break
        ;; ++i
        (i32.add
          (local.get $i)
          (i32.const 1))
        local.set $i
        ;; result = i * result
        (i32.mul
          (local.get $i)
          (local.get $result))
        local.set $result
        ;; log current result
        (call $log
          (local.get $i)
          (local.get $result))
        ;; break if i == n
        (br_if $break
          (i32.eq
            (local.get $i)
            (local.get $n)))
        br $continue
      )
    )
    local.get $result
  )
  (export "factorial_logger" (func $factorial_logger))
)
