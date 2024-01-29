# Sistema de Avaliação de Alunos

Este programa realiza o cálculo da situação de cada aluno com base na média das três provas (P1, P2 e P3). A tabela de situações é a seguinte:

- Se a média (m) for inferior a 5: **Reprovado por Nota**
- Se a média for maior ou igual a 5 e menor que 7: **Exame Final**
- Se a média for maior ou igual a 7: **Aprovado**

Além disso, o programa considera a situação "Reprovado por Falta" se o número de faltas ultrapassar 25% do total de aulas, independentemente da média. Para os casos em que a situação é "Exame Final", é necessário calcular a "Nota para Aprovação Final" (naf) de cada aluno usando a seguinte fórmula:

5 <= (m + naf)/2

O resultado final é arredondado para o próximo número inteiro (arredondamento para cima, se necessário). Os registros das atividades são exibidos por meio de linhas de logs para acompanhamento do processo.

## Instruções de Uso

Acessar o site: https://tourmaline-selkie-9427de.netlify.app/
Caso seja necessária alteração nas planilhas acessar pelo site na logo do Google Sheets
