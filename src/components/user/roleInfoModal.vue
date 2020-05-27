<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="name">
            <Input v-model="formItem.name" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="abilities">
            <CheckboxGroup v-model="formItem.abilities">
                <Checkbox v-for="ability in abilities" :key="ability" :label=ability></Checkbox>
            </CheckboxGroup>
        </FormItem>
    </Form>
</template>
<script>
    import {get} from "@/apis/restUtils"
    export default {
        data () {
            return {
                formItem: {
                    abilities:[]
                },
                abilities:[]
            }
        },
        props: ['row'],
        mounted: function() {
            console.log("roleManager", this.row)
            this.formItem = this.row
            get("/admin/getAllAbilityNames", reponse => {
                this.abilities = []
                this.abilities = reponse.data;
                console.log(reponse.data);
            })
        },
        methods: {
            
        }
    }
</script>
