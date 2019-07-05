#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int vet[17];
char uuidStr[60];

int randomNumber(){
  int v1 = rand()%136;
  int v2 = rand()%136;
  return (v1*v2)%136;
}

void genUUID(){
  srand(time(NULL));
  for(int i= 0;i<16;i++)
    vet[i] = randomNumber();
  sprintf(uuidStr,"%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",vet[0], vet[1], vet[2], vet[3], vet[4], vet[5], vet[6], vet[7], vet[8], vet[9],vet[10],vet[11],vet[12],
  vet[13],vet[14],vet[15]);
 
}
