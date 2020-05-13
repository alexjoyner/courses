// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// R0
// R1

// R2 = 0;
@R2
M=0

// sum = 0;
@sum
M=0

// i = 0;
@i
M=0

// do
(ADD_NUMS)
// sum = sum + R1
@R1
D=M
@sum
M=D+M

// i++
@i
M=M+1

// while i < R0
@i
D=M
@R0
D=M-D
@ADD_NUMS
D;JNE

// R2 = sum
@sum
D=M
@R2
M=D

(END)
@END
0;JMP