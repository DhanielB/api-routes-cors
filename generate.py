import random

down_case = list('abcdefghijklmnopqrstuvwxyz')
upper_case = list('abcdefghijklmnopqrstuvwxyz'.upper())
number = list('0123456789')

all_cases = down_case + upper_case + number

while(True):
    lenght = int(input('Quanto caracteres você deseja? '))
    
    password = ''
    
    for i in range(lenght):
        password += str(random.choice(all_cases))
    
    print("Resultado : "+password)