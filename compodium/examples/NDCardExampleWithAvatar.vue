<template>
  <NDCard>
    <template #header>
      <NDAvatar name="Sean Yager" />
      <NDHeading>Sean Yager</NDHeading>
    </template>
    <template #default>
      <NDHeading as="h2">Card Subtitle</NDHeading>
      <NDParagraph>Card Content</NDParagraph>
    </template>
    <template #footer>
      <NDButton>Card Footer</NDButton>
    </template>
  </NDCard>
</template>
