<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in this.trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span>创建日期:{{ this.curTrashNoteId.createdAtFriendly }}</span>
        <span>|</span>
        <span>更新日期:{{ this.curTrashNoteId.updatedAtFriendly }}</span>
        <span>|</span>
        <span>所属笔记本:{{ this.belongTo }}</span>
        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ this.curTrashNoteId.title }}</span>
        <span>{{ this.curTrashNoteId.content }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import { mapActions, mapGetters, mapMutations } from 'vuex';


let md = new MarkdownIt();
export default {
  name: 'Login',
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNoteId',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.trashNotes.content || '');
    }
  },
  created() {
    this.checkLogin({ path: '/login' });
    this.getNotebooks();
    this.getTrashNotes()
      .then(() => {
        this.setCurTrashNote({ curTrashNoteId: Number(this.$route.query.noteId) });
        this.$router.replace({
          path: '/trash',
          query: { noteId: this.curTrashNoteId.id }
        });
      });
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'deleteTrashNote',
      'revertTrashNote',
      'checkLogin',
      'getTrashNotes',
      'getNotebooks'
    ]),
    onDelete() {
      this.$confirm('删除后无法回复', '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        return this.deleteTrashNote({ noteId: this.curTrashNoteId.id })
      }).then(()=>{
        this.setCurTrashNote();
        this.$router.replace({
          path: '/trash',
          query: { noteId: this.curTrashNoteId.id }
        });
      })
    },
    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNoteId.id })
      .then(()=>{
        this.setCurTrashNote();
        this.$router.replace({
          path: '/trash',
          query: { noteId: this.curTrashNoteId.id }
        });
      })
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId });
    next();
  }

};
</script>
<style lang="less">
@import "../assets/css/note-detail";
@import "../assets/css/note-sidebar";

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 10;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px
    }
  }
}
</style>

