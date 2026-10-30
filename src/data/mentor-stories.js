// Accompagnement pédagogique, sans scénario d’enquête.
export const mentorStories=[
  {
    "title": "Comprendre l’IA générative",
    "scene": "Partons de trois actions simples : appliquer une règle, reconnaître à partir d’exemples, créer un texte. Je vais vous aider à distinguer ces fonctionnements.",
    "goal": "Distinguer IA, apprentissage automatique et IA générative.",
    "evidence": "L’IA est un domaine ; l’apprentissage automatique en est une approche ; l’IA générative produit des contenus.",
    "role": "Comprendre",
    "question": "Un outil rédige un nouveau texte. Quelle famille décrit cette capacité ?",
    "options": [
      "IA générative",
      "Règle de tri fixe",
      "Stockage de documents"
    ],
    "correct": 0,
    "explanation": "Générer consiste à produire un contenu nouveau. Cela ne garantit pas que ce contenu soit vrai.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Distinguer IA, apprentissage automatique et IA générative.",
      "L’IA est un domaine ; l’apprentissage automatique en est une approche ; l’IA générative produit des contenus.",
      "Générer consiste à produire un contenu nouveau. Cela ne garantit pas que ce contenu soit vrai."
    ]
  },
  {
    "title": "Trois façons d’apprendre",
    "scene": "Regardons d’où vient le signal qui permet d’apprendre : une réponse fournie, une partie du texte, ou une récompense. C’est le repère essentiel de cette partie.",
    "goal": "Reconnaître les apprentissages supervisé, auto-supervisé et par renforcement.",
    "evidence": "Les réponses étiquetées, la prédiction à partir des données et les récompenses correspondent à des signaux d’apprentissage différents.",
    "role": "Comprendre",
    "question": "On cache un morceau d’un texte pour entraîner un modèle à le retrouver. Quel apprentissage est illustré ?",
    "options": [
      "Supervisé avec étiquettes humaines",
      "Auto-supervisé",
      "Par renforcement"
    ],
    "correct": 1,
    "explanation": "La cible est obtenue à partir des données elles-mêmes : c’est le principe de l’apprentissage auto-supervisé.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Reconnaître les apprentissages supervisé, auto-supervisé et par renforcement.",
      "Les réponses étiquetées, la prédiction à partir des données et les récompenses correspondent à des signaux d’apprentissage différents.",
      "La cible est obtenue à partir des données elles-mêmes : c’est le principe de l’apprentissage auto-supervisé."
    ]
  },
  {
    "title": "Réseaux et paramètres",
    "scene": "Un réseau de neurones réalise des calculs avec des paramètres appris. Prenons le temps de distinguer les couches du réseau et les réglages qu’il ajuste.",
    "goal": "Comprendre neurones artificiels, paramètres et apprentissage profond.",
    "evidence": "Les paramètres sont ajustés pendant l’entraînement ; un réseau profond organise ses calculs en plusieurs couches.",
    "role": "Comprendre",
    "question": "Après l’entraînement, que désignent les paramètres d’un modèle ?",
    "options": [
      "Les messages de la conversation",
      "Les réglages numériques appris",
      "Les réponses rédigées à l’avance"
    ],
    "correct": 1,
    "explanation": "Les paramètres sont des valeurs numériques apprises. Ils ne sont pas l’historique d’une conversation.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Comprendre neurones artificiels, paramètres et apprentissage profond.",
      "Les paramètres sont ajustés pendant l’entraînement ; un réseau profond organise ses calculs en plusieurs couches.",
      "Les paramètres sont des valeurs numériques apprises. Ils ne sont pas l’historique d’une conversation."
    ]
  },
  {
    "title": "Comment apprend un LLM",
    "scene": "Je vais vous montrer la fabrication d’un modèle : ses données, ses prédictions et les ajustements de ses paramètres. Gardez en tête la différence entre apprendre et consulter une information.",
    "goal": "Relier LLM, données, entraînement, pré-entraînement et modèle de base.",
    "evidence": "Le pré-entraînement ajuste les paramètres à partir de données ; il ne fournit pas un accès automatique aux documents récents.",
    "role": "Expliquer le modèle",
    "question": "Un document vient d’être modifié. Le pré-entraînement donne-t-il automatiquement accès à cette nouvelle version ?",
    "options": [
      "Oui, toujours",
      "Seulement si on baisse la température",
      "Non, il faut fournir un accès à cette information"
    ],
    "correct": 2,
    "explanation": "Les paramètres appris ne se mettent pas à jour à chaque modification d’un document. L’application doit rendre l’information disponible au modèle.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Relier LLM, données, entraînement, pré-entraînement et modèle de base.",
      "Le pré-entraînement ajuste les paramètres à partir de données ; il ne fournit pas un accès automatique aux documents récents.",
      "Les paramètres appris ne se mettent pas à jour à chaque modification d’un document. L’application doit rendre l’information disponible au modèle."
    ]
  },
  {
    "title": "Du modèle à l’assistant",
    "scene": "Un modèle de base sait poursuivre du texte. Nous allons regarder comment les exemples de dialogue et les préférences contribuent à préparer un assistant, puis distinguer le modèle de l’application.",
    "goal": "Distinguer SFT, RLHF, modèle de récompense, assistant et chatbot.",
    "evidence": "L’ajustement supervisé utilise des exemples ; le RLHF exploite des préférences ; le chatbot est l’application de dialogue.",
    "role": "Expliquer le modèle",
    "question": "Quel élément désigne l’interface avec laquelle on échange ?",
    "options": [
      "Le pré-entraînement",
      "Le chatbot",
      "Un paramètre"
    ],
    "correct": 1,
    "explanation": "Le chatbot est l’application. Le modèle qui génère ses réponses est un autre élément de l’ensemble.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Distinguer SFT, RLHF, modèle de récompense, assistant et chatbot.",
      "L’ajustement supervisé utilise des exemples ; le RLHF exploite des préférences ; le chatbot est l’application de dialogue.",
      "Le chatbot est l’application. Le modèle qui génère ses réponses est un autre élément de l’ensemble."
    ]
  },
  {
    "title": "Entraîner et utiliser un modèle",
    "scene": "Comparons deux moments : fabriquer le modèle, puis lui demander une réponse. Les deux demandent du calcul, mais ce ne sont pas les mêmes opérations.",
    "goal": "Distinguer entraînement, inférence, GPU, calcul, énergie et lois d’échelle.",
    "evidence": "L’inférence utilise un modèle pour produire une réponse ; l’entraînement ajuste ses paramètres.",
    "role": "Mettre en pratique",
    "question": "Un modèle déjà entraîné produit une réponse. Quelle opération réalise-t-il ?",
    "options": [
      "Une inférence",
      "Un nouveau pré-entraînement complet",
      "Une distillation automatique"
    ],
    "correct": 0,
    "explanation": "À l’inférence, le modèle calcule une sortie à partir de son entrée et de ses paramètres.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Distinguer entraînement, inférence, GPU, calcul, énergie et lois d’échelle.",
      "L’inférence utilise un modèle pour produire une réponse ; l’entraînement ajuste ses paramètres.",
      "À l’inférence, le modèle calcule une sortie à partir de son entrée et de ses paramètres."
    ]
  },
  {
    "title": "Contexte et consignes",
    "scene": "Essayons de changer les informations données au modèle sans toucher à ses paramètres. Cela permet de comprendre le rôle du contexte et des consignes système.",
    "goal": "Comprendre le contexte et le prompt système.",
    "evidence": "Changer le contexte peut modifier une réponse sans réentraîner le modèle.",
    "role": "Mettre en pratique",
    "question": "Une nouvelle consigne change la réponse alors que les paramètres sont identiques. Qu’est-ce qui a changé ?",
    "options": [
      "Le contexte de l’inférence",
      "Le nombre de couches",
      "Les données du pré-entraînement"
    ],
    "correct": 0,
    "explanation": "Les consignes et les informations fournies font partie de l’entrée. Une entrée différente peut produire une sortie différente.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Comprendre le contexte et le prompt système.",
      "Changer le contexte peut modifier une réponse sans réentraîner le modèle.",
      "Les consignes et les informations fournies font partie de l’entrée. Une entrée différente peut produire une sortie différente."
    ]
  },
  {
    "title": "Tokens et fenêtre de contexte",
    "scene": "Une conversation peut devenir trop longue pour tenir dans l’entrée du modèle. Regardons comment elle est découpée et quelles informations restent réellement disponibles.",
    "goal": "Comprendre tokenizer, tokens et fenêtre de contexte.",
    "evidence": "La fenêtre a une capacité limitée. Une information exclue de l’entrée ne peut pas être supposée encore disponible.",
    "role": "Mettre en pratique",
    "question": "Une information a été retirée du contexte envoyé au modèle. Peut-on supposer qu’il la voit encore ?",
    "options": [
      "Oui, parce qu’elle apparaît dans l’interface",
      "Non, il faut la fournir à nouveau si elle est utile",
      "Oui, avec une température plus élevée"
    ],
    "correct": 1,
    "explanation": "L’historique visible et l’entrée effectivement transmise peuvent être différents. Seul ce qui est fourni est disponible dans ce contexte.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Comprendre tokenizer, tokens et fenêtre de contexte.",
      "La fenêtre a une capacité limitée. Une information exclue de l’entrée ne peut pas être supposée encore disponible.",
      "L’historique visible et l’entrée effectivement transmise peuvent être différents. Seul ce qui est fourni est disponible dans ce contexte."
    ]
  },
  {
    "title": "Comment se construit la réponse",
    "scene": "Suivons le trajet des tokens : leurs représentations numériques, les relations calculées par l’attention, puis le choix du token suivant. Nous allons relier les mécanismes à un exemple.",
    "goal": "Relier embeddings, attention, Transformer et génération.",
    "evidence": "Les embeddings représentent les tokens ; l’attention exploite leurs relations dans le contexte ; la génération avance token par token.",
    "role": "Mettre en pratique",
    "question": "Quel mécanisme exploite les relations entre tokens dans le contexte ?",
    "options": [
      "L’attention",
      "Le stockage de notes",
      "La température seule"
    ],
    "correct": 0,
    "explanation": "L’attention pondère les relations entre les tokens autorisés par le modèle. Elle contribue à construire leurs représentations.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Relier embeddings, attention, Transformer et génération.",
      "Les embeddings représentent les tokens ; l’attention exploite leurs relations dans le contexte ; la génération avance token par token.",
      "L’attention pondère les relations entre les tokens autorisés par le modèle. Elle contribue à construire leurs représentations."
    ]
  },
  {
    "title": "Comparer les réponses et leurs limites",
    "scene": "Pour finir, comparons plusieurs réponses et plusieurs méthodes. Une formulation différente n’est pas forcément une erreur ; une réponse réussie n’est pas non plus une garantie générale.",
    "goal": "Comprendre température, variabilité, raisonnement, données synthétiques, distillation et AGI.",
    "evidence": "La température agit sur la diversité ; la fiabilité demande des vérifications. Une réussite isolée ne démontre pas une compétence générale.",
    "role": "Mettre en pratique",
    "question": "Baisser la température garantit-il une réponse vraie ?",
    "options": [
      "Oui, toute erreur disparaît",
      "Non, cela agit sur l’échantillonnage",
      "Oui, si la réponse est courte"
    ],
    "correct": 1,
    "explanation": "La température règle la diversité de l’échantillonnage. Elle ne vérifie pas les faits et ne garantit pas leur exactitude.",
    "after": "Le cours est parcouru. Vous pouvez passer à l’exercice, revoir une notion avec moi ou faire un court point de compréhension.",
    "hints": [
      "Comprendre température, variabilité, raisonnement, données synthétiques, distillation et AGI.",
      "La température agit sur la diversité ; la fiabilité demande des vérifications. Une réussite isolée ne démontre pas une compétence générale.",
      "La température règle la diversité de l’échantillonnage. Elle ne vérifie pas les faits et ne garantit pas leur exactitude."
    ]
  }
];
