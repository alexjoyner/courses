const fs = require('fs');

const filename = 'PongL';

const file = fs.readFileSync(`${filename}.asm`, 'utf8');

const fileLinesArray = file.split('\n');

const output = [];

const get16bitArray = () => new Uint8Array(new ArrayBuffer(16));

const dec2binArray = (dec) => {
  return (dec >>> 0).toString(2).split('');
}

const assembleInstruction = (inst) => {
  const binArray = get16bitArray();
  if(inst.substr(0, 1) === '@'){
    const A_Num = inst.substr(1);
    const A_BinArray = dec2binArray(parseInt(A_Num, 10));
    for(let i = 0; i < A_BinArray.length; i++){
      const binArrayPos = (binArray.length - A_BinArray.length) + i;
      binArray[binArrayPos] = A_BinArray[i];
    }
    return binArray.join('');
  };
  // C Instruction
  binArray[0] = 1;
  binArray[1] = 1;
  binArray[2] = 1;

  
  const EqualsIndex = inst.indexOf('=');
  const SimiColonIdx = inst.indexOf(';');
  
  // Handle dest portions
  if(EqualsIndex > -1){
    // StoreDest should not get the = sign,
    // Ex: AM=M-d , StoreDest = AM
    const StoreDest = inst.substr(0,EqualsIndex);
    if(StoreDest.indexOf('A') > -1) binArray[10] = 1;
    if(StoreDest.indexOf('D') > -1) binArray[11] = 1;
    if(StoreDest.indexOf('M') > -1) binArray[12] = 1;
  }
  
  //Handle Comp Section
  const CompStart = (EqualsIndex > -1)?EqualsIndex+1:0;
  const CompEnd = (SimiColonIdx > -1)?(SimiColonIdx-CompStart):undefined;
  const compSection = inst.substr(CompStart, CompEnd);
  if(compSection.indexOf('M') > -1) binArray[3] = 1;
  const matchAM = /([am])/ig;
  const matchD = /([d])/ig;
  const aluOp = compSection.replace(matchAM, 'y').replace(matchD, 'x');
  const zxConditions = ['0','1','-1','y','!y','-y','y+1','y-1'];
  const nxConditions = ['1','-1','y','!y','-y','x+1','y+1','y-1','x-y','x|y'];
  const zyConditions = ['0','1','-1','x','!x','-x','x+1','x-1'];
  const nyConditions = ['1','x','!x','-x','x+1','y+1','x-1','y-x','x|y'];
  const fConditions = ['0','1','-1','-x','-y','x+1','y+1','x-1','y-1','x+y','x-y','y-x'];
  const noConditions = ['1','!x','!y','-x','-y','x+1','y+1','y+1','x-y','y-x','x|y'];

  if(zxConditions.indexOf(aluOp) > -1) binArray[4] = 1;
  if(nxConditions.indexOf(aluOp) > -1) binArray[5] = 1;
  if(zyConditions.indexOf(aluOp) > -1) binArray[6] = 1;
  if(nyConditions.indexOf(aluOp) > -1) binArray[7] = 1;
  if(fConditions.indexOf(aluOp) > -1) binArray[8] = 1;
  if(noConditions.indexOf(aluOp) > -1) binArray[9] = 1;

  //Handle Jump Section
  const jumpSection = (SimiColonIdx > -1)?inst.substr(SimiColonIdx+1):null;
  if(inst === '0;JMP'){
    binArray[13] = 1;
    binArray[14] = 1;
    binArray[15] = 1;
  }
  const j1Conditions = ['JLT', 'JNE', 'JLE'];
  const j2Conditions = ['JEQ', 'JGE', 'JLE'];
  const j3Conditions = ['JGT', 'JGE', 'JGE', 'JNE'];
  if(j1Conditions.indexOf(jumpSection) > -1) binArray[13] = 1;
  if(j2Conditions.indexOf(jumpSection) > -1) binArray[14] = 1;
  if(j3Conditions.indexOf(jumpSection) > -1) binArray[15] = 1;
  

  return `${binArray.join('')}`;
}

for(let i = 0; i < fileLinesArray.length; i++){
  const inst = fileLinesArray[i];
  if(inst.indexOf('//') > -1) continue;
  if(inst.substr(0, 2) === '') continue;
  const binary  = assembleInstruction(inst)
  output.push(`${binary}\n`);
}


console.log(output);
fs.writeFile(`${filename}.hack`, output.join(''), 'utf8', (err) => {
  if(err) throw err;
  console.log('Write Complete');
});