// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// numOfAddresses = sizeOfScreen
@8191
D=A
@numOfAddresses
M=D
@currentValue
M=0
@lastValue
M=0
// fillValue = 0
@fillValue
M=-1

(LISTENING)
// While true
  // currentValue = KBD
  @KBD
  D=M
  @currentValue
  M=D
  // if lastvalue - currentvalue == 0, don't fill screen
  @lastValue
  D=M-D
  @LISTENING
  D;JEQ

  // lastValue = currentValue
  @currentValue
  D=M
  @lastValue
  M=D

  // If D == 0
  //   Jump to white screen
  @fillValue
  M=0
  @FILL_SCREEN
  D;JEQ


  // Else
  //   Jump to Black Screen
  @fillValue
  M=-1
  @FILL_SCREEN
  D;JNE



(FILL_SCREEN)
// i = 0
@i
M=0
// Fill Address
@nextAddress
M=0
// do
(FILL_NEXT)
// address = i + screen address
@SCREEN
D=A
@i
D=D+M
@nextAddress
M=D
// SCREEN[ADDRESS] = fillValue
@fillValue
D=M
@nextAddress
A=M
M=D
// While numOfAddresses - i = 0
@i
D=M
@numOfAddresses
D=M-D
// i++
@i
M=M+1
// Jmp to (FILL_SCREEN)
@FILL_NEXT
D;JGT
// Jmp to (LISTENING)
@LISTENING
0;JMP

(END)
@END
0;JMP