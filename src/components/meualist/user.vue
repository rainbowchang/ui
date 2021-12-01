<template>
    <div style="display: block">
        <div class="c_button">
            <Button type="primary" ghost size="small" @click="add">新增</Button>
        </div>
        <div>
            <Table highlight-row height="auto" width="auto" border :columns="columns12" :data="tableData">


            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name: "user"
}
</script>

<style scoped>

</style>